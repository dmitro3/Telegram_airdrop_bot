"use client";

import _ from "lodash";
import React, { useEffect } from "react";
import useMediaQuery from "./useMediaQuery";
import { useImmer } from "use-immer";
import { TargetAndTransition } from "framer-motion";
import useElementSize from "./useElementSize";
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
    fall: { distance: 15, delay: 100 },
    fly: { distance: 75 },
    flap: {
      delay: 100,
    },
  },
  pipes: Array(4)
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
    distance: 1.1,
    step: 5,
  },
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
}
type StateDraft = WritableDraft<GameState>;
const GameContext = React.createContext<GameContext | null>(null);
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<GameState>(defaultState);
  const [showModal, setShowModal] = React.useState(false);
  // Main Functions
  const startGame = (window: Size) => {
    setState((draft) => {
      draft.window = window;
      draft.isReady = true;
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
  // Pipe Functions
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
    const pipeGap = (1 / 5) * window.width; // Adjust this value to control the gap between pipes
    const pipeWidth = window.width / draft.pipes.length; // Width of each pipe

    draft.pipe.width = pipeWidth;
    draft.pipe.height = (1 / 3) * window.height; // Height of the pipe
    draft.pipe.extension = (0.5 / 3) * window.height; // Extension for pipe height

    draft.pipes.forEach((pipe, index) => {
      const { height, y } = generatePipeExtension(index, draft);

      // Position the pipes based on their index and gap
      const x = window.width + index * (pipeWidth + pipeGap); // Adjusted pipe position to avoid overlap

      // Top pipe
      pipe.top.initial = {
        x,
        y: 0,
      };
      pipe.top.size = {
        height,
        width: pipeWidth,
      };

      // Bottom pipe
      pipe.bottom.initial = {
        x,
        y,
      };
      pipe.bottom.size = {
        height,
        width: pipeWidth,
      };

      // Set positions
      pipe.top.position = pipe.top.initial;
      pipe.bottom.position = pipe.bottom.initial;

      // Ensure 'passed' is reset
      pipe.top.passed = false;
      pipe.bottom.passed = false;
    });
  };

  const movePipes = () => {
    setState((draft) => {
      draft.pipes.forEach((pipe, index) => {
        const birdPassedPipe =
          pipe.top.position.x + pipe.top.size.width < draft.bird.position.x;

        // If the bird passes the pipe and the score hasn't been increased for this pipe yet
        if (birdPassedPipe && !pipe.top.passed) {
          increaseScore(draft);
          multiplySpeed(draft);
          pipe.top.passed = true; // Mark this pipe as passed
          pipe.bottom.passed = true; // Ensure the bottom pipe is also marked as passed
        }

        // Reset pipe position when it moves out of the window
        if (pipe.top.position.x + pipe.top.size.width <= 0) {
          const { height, y } = generatePipeExtension(index, draft);
          pipe.top.position.x = draft.pipe.width * 2 + draft.window.width;
          pipe.bottom.position.x = draft.pipe.width * 2 + draft.window.width;
          pipe.top.size.height = height;
          pipe.bottom.size.height = height;
          pipe.bottom.position.y = y;
          pipe.top.key = v4();
          pipe.bottom.key = v4();
          pipe.top.passed = false; // Reset the passed state for the new pipe
          pipe.bottom.passed = false; // Reset the passed state for the new pipe
        }

        // Move the pipes
        pipe.top.position.x -= draft.pipe.distance;
        pipe.bottom.position.x -= draft.pipe.distance;
      });

      return draft;
    });
  };

  // Window Functions
  const handleWindowClick = () => {
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
  };
  // Bird Functions
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
    const checkImpact = (draft: StateDraft) => {
      const groundImpact =
        draft.bird.position.y + draft.bird.size.height / 2 >=
        draft.window.height;
      const impactablePipes = draft.pipes.filter((pipe) => {
        return (
          pipe.top.position.x <
            draft.bird.position.x -
              draft.pipe.tolerance +
              draft.bird.size.width / 2 &&
          pipe.top.position.x + pipe.top.size.width >
            draft.bird.position.x + draft.pipe.tolerance - draft.bird.size.width / 2
        );
      });
      const pipeImpact = impactablePipes.some((pipe) => {
        console.log("A", pipe.top.position.x)
        const topPipe = pipe.top.position.y + pipe.top.size.height;
        const bottomPipe = pipe.bottom.position.y;
        const birdTop = draft.bird.position.y + draft.bird.size.height / 2;
        const birdBottom =
          draft.bird.position.y + draft.bird.size.height / 2 - draft.pipe.tolerance;
        return birdTop < topPipe || birdBottom > bottomPipe;
      });
      if (groundImpact || pipeImpact) {
        console.log("ground->", groundImpact, "pipe->", pipeImpact)
        draft.bird.isFlying = false;
        draft.isStarted = false;
        setShowModal(true);
      } else {
        draft.bird.animate.rotate = [0, 0];
      }
    };

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
        setBirdCenter(draft);
        createPipes(draft);
        return draft;
      });
    }
  };

  const handleExit = () => {
    setShowModal(false);
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
