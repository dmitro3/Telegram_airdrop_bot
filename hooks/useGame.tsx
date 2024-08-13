"use client";

import _ from "lodash";
import React from "react";
import { useImmer } from "use-immer";
import { TargetAndTransition } from "framer-motion";
import { WritableDraft } from "immer";
import { v4 } from "uuid";
import Modal from "@/app/components/Modal";

const HEIGHT = 50;
const WIDTH = 50;
const FRAMES = ["0px", "50px", "50px", "0px"];
const defaultState = {
  bird: {
    position: { x: 0, y: 0 },
    size: { width: WIDTH, height: HEIGHT },
    animate: {},
    frame: FRAMES[0],
    frameIndex: 0,
    initial: {
      x: 0,
      y: 0,
    },
    isFlying: true,
    isVisible: true,
    fall: { distance: 20, delay: 100 },
    fly: { distance: 100 },
    flap: {
      delay: 0,
    },
  },
  pipes: Array(6)
    .fill("")
    .map((_, index) => ({
      top: {
        key: "top" + index,
        position: { x: 0, y: 0 },
        initial: {
          x: 0,
          y: 0,
        },
        size: { width: 0, height: 0 },
        passed: false,
      },
      bottom: {
        key: "bottom" + index,
        position: { x: 0, y: 0 },
        initial: {
          x: 0, 
          y: 0,
        },
        size: { width: 0, height: 0 },
        passed: false,
      },
    })),
  pipe: {
    width: 0,
    height: 0,
    extension: 0,
    tolerance: 0,
    distance: 15,
    delay: 75,
  },
  rounds: [],
  isStarted: false,
  isReady: false,
  window: {
    width: 0,
    height: 0,
  },
  multiplier: {
    distance: 1,
    step: 5,
  },
  collision: false,
};

type Size = {
  width: number;
  height: number;
};
type Coordinates = {
  x: number;
  y: number;
};

export type PipeType = {
  position: Coordinates;
  initial: Coordinates;
  size: Size;
  key?: string;
  passed: boolean;
};
export type PipesType = {
  top: PipeType;
  bottom: PipeType;
};

interface GameContext extends GameState {
  getNextFrame: () => void;
  fly: () => void;
  fall: () => void;
  handleWindowClick: () => void;
  movePipes: () => void;
  startGame: (window: Size) => void;
}

interface GameState {
  bird: {
    position: Coordinates;
    size: Size;
    animate: TargetAndTransition;
    frame: string;
    frameIndex: number;
    initial: Coordinates;
    isFlying: boolean;
    isVisible: boolean;
    fall: {
      distance: number;
      delay: number;
    };
    fly: {
      distance: number;
    };
    flap: {
      delay: number;
    };
  };
  pipes: PipesType[];
  pipe: {
    width: number;
    height: number;
    extension: number;
    delay: number;
    distance: number;
    tolerance: number;
  };
  rounds: {
    score: number;
    datetime: string;
    key: string;
  }[];
  isStarted: boolean;
  isReady: boolean;
  window: Size;
  multiplier: {
    step: number;
    distance: number;
  };
  collision: boolean;
}

type StateDraft = WritableDraft<GameState>;
const GameContext = React.createContext<GameContext | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<GameState>(defaultState);
  const [showModal, setShowModal] = React.useState(false);

  const startGame = (window: Size) => {
    setState((draft) => {
      draft.window = window;
      draft.isReady = true;
      draft.bird.isVisible = true;
      draft.collision = false;
      setBirdCenter(draft);
      createPipes(draft);
      return draft;
    });
  };

  const increaseScore = (draft: StateDraft) => {
    draft.rounds[draft.rounds.length - 1].score += 1;
  };

  const multiplySpeed = (draft: StateDraft) => {
    const round = _.last(draft.rounds);
    if (round && round.score % draft.multiplier.step === 0) {
      draft.pipe.distance = draft.pipe.distance * draft.multiplier.distance;
    }
  };

  
  const generatePipeExtension = (index: number, draft: StateDraft) => {
    const odd = _.random(0, 1) === 1;
    const randomNumber = _.random(odd ? 0.5 : 0, odd ? 1 : 0, true);
    const extension = randomNumber * draft.pipe.extension;
    return {
      height: draft.pipe.height + extension,
      y: draft.window.height - draft.pipe.height + extension,
    };
  };

  const createPipes = (draft: StateDraft) => {
    const window = draft.window;
    const pipeGap = (1 / 3) * window.width;
    const pipeWidth = window.width / draft.pipes.length;

    draft.pipe.width = pipeWidth;
    draft.pipe.height = 0.3 * window.height;
    draft.pipe.extension = (0.5 / 6) * window.height;

    draft.pipes.forEach((pipe, index) => {
      const { height, y } = generatePipeExtension(index, draft);

      const x = window.width + index * (pipeWidth + pipeGap);

      pipe.top.initial = {
        x,
        y: 0,
      };
      pipe.top.size = {
        height,
        width: pipeWidth,
      };

      pipe.bottom.initial = {
        x,
        y,
      };
      pipe.bottom.size = {
        height,
        width: pipeWidth,
      };

      pipe.top.position = pipe.top.initial;
      pipe.bottom.position = pipe.bottom.initial;

      pipe.top.passed = false;
      pipe.bottom.passed = false;
    });
  };

  const movePipes = () => {
    setState((draft) => {
      const windowWidth = draft.window.width;
      const pipeGap = (1 / 3) * windowWidth;
      const pipeWidth = draft.pipe.width;

      draft.pipes.forEach((pipe, index) => {
        const birdPassedPipe =
          pipe.top.position.x + pipe.top.size.width < draft.bird.position.x;

        if (birdPassedPipe && !pipe.top.passed) {
          increaseScore(draft);
          multiplySpeed(draft);
          pipe.top.passed = true;
          pipe.bottom.passed = true;
        }

        if (pipe.top.position.x + pipe.top.size.width <= 0) {
          const { height, y } = generatePipeExtension(index, draft);

          const previousPipe =
            draft.pipes[(index - 1 + draft.pipes.length) % draft.pipes.length];
          const newPositionX =
            previousPipe.top.position.x + pipeWidth + pipeGap;

          pipe.top.position.x = newPositionX;
          pipe.bottom.position.x = newPositionX;
          pipe.top.size.height = height;
          pipe.bottom.size.height = height;
          pipe.bottom.position.y = y;
          pipe.top.key = v4();
          pipe.bottom.key = v4();
          pipe.top.passed = false;
          pipe.bottom.passed = false;
        }

        pipe.top.position.x -= draft.pipe.distance;
        pipe.bottom.position.x -= draft.pipe.distance;
      });

      return draft;
    });
  };

  const handleWindowClick = () => {
    if (!state.collision) {
      if (state.isStarted) {
        fly();
      } else {
        setState((draft) => {
          draft.isStarted = true;
          draft.rounds.push({
            score: 0,
            datetime: new Date().toISOString(),
            key: v4(),
          });
          draft.bird.isFlying = true;
          setBirdCenter(draft);
          createPipes(draft);
          return draft;
        });
      }
    }
  };

  const setBirdCenter = (draft: StateDraft) => {
    draft.bird.position.x = draft.window.width / 2 - draft.bird.size.width / 2;
    draft.bird.position.y =
      draft.window.height / 2 - draft.bird.size.height / 2;
    draft.bird.initial.x = draft.bird.position.x;
    draft.bird.initial.y = draft.bird.position.y;
  };

  const getNextFrame = () =>
    setState((draft) => {
      var next = (draft.bird.frameIndex + 1) % FRAMES.length;
      draft.bird.frame = FRAMES[next];
      draft.bird.frameIndex = next;
      return draft;
    });

  const handleContinue = () => {
    setShowModal(false);
    startGame(state.window);
    if (state.isStarted) {
      fly();
    } else {
      setState((draft) => {
        draft.isStarted = true;
        draft.rounds.push({
          score: 0,
          datetime: new Date().toISOString(),
          key: v4(),
        });
        draft.bird.isFlying = true;
        draft.collision = false;
        setBirdCenter(draft);
        createPipes(draft);
        return draft;
      });
    }
  };

  const handleExit = () => {
    setShowModal(false);
  };

  const checkImpact = (draft: StateDraft) => {
    const birdTop = draft.bird.position.y;
    const birdBottom = draft.bird.position.y + draft.bird.size.height;

    const groundImpact =
      birdBottom >= draft.window.height + draft.pipe.tolerance;

    const impactablePipes = draft.pipes.filter((pipe) => {
      const pipeRightEdge = pipe.top.position.x + pipe.top.size.width;
      const pipeLeftEdge = pipe.top.position.x;

      return (
        pipeRightEdge > draft.bird.position.x &&
        pipeLeftEdge < draft.bird.position.x + draft.bird.size.width
      );
    });

    const pipeImpact = impactablePipes.some((pipe) => {
      const topPipeBottom = pipe.top.position.y + pipe.top.size.height;
      const bottomPipeTop = pipe.bottom.position.y;

      return birdTop + 40 < topPipeBottom || birdBottom - 20 > bottomPipeTop;
    });

    if (groundImpact || pipeImpact) {
      draft.bird.isFlying = false;
      draft.isStarted = false;
      draft.collision = true;
      
      // Make the bird rotate immediately upon collision
      draft.bird.animate.rotate = [0, 90];

      setTimeout(() => {
        // After 1 second, make the bird fall to the ground
        setState((innerDraft) => {
          innerDraft.bird.position.x = innerDraft.bird.initial.x;
          innerDraft.bird.position.y =
            innerDraft.window.height - innerDraft.bird.size.height;
          return innerDraft;
        });

        setTimeout(() => {
          setShowModal(true);
        }, 1970); // Show the modal after the bird falls
      }, 30); // Delay for 1 second before the bird falls
    } else {
      draft.bird.animate.rotate = [0, 0];
    }
  };

  const fly = () => {
    setState((draft) => {
      draft.bird.isFlying = true;
      checkImpact(draft);
      draft.bird.position.y -= draft.bird.fly.distance;
      return draft;
    });
  };

  const fall = () => {
    setState((draft) => {
      draft.bird.isFlying = true;
      checkImpact(draft);
      draft.bird.position.y += draft.bird.fall.distance;
      return draft;
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        getNextFrame,
        fall,
        fly,
        handleWindowClick,
        movePipes,
        startGame,
      }}
    >
      {children}
      <Modal show={showModal} onContinue={handleContinue} onExit={handleExit} />
    </GameContext.Provider>
  );
};

export default function useGame() {
  const context = React.useContext(GameContext);
  if (context === null) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
