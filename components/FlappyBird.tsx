import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";

export function Bird() {
  const {
    bird: {
      size: { height, width },
      frame,
      isFlying,
      flap: { delay },
    },
    getNextFrame,
  } = useGame();
  useInterval(() => getNextFrame(), isFlying ? delay : null);
  return (
    <div
      style={{
        backgroundImage: "url(bird.png)",
        height,
        width,
        backgroundPosition: frame,
        backgroundSize: "100% 100%",
        zIndex: 100,
      }}
    />
  );
}

export default function FlappyBird() {
  const {
    isStarted,
    bird: {
      fall: { delay },
      position,
      animate,
      isFlying,
    },
    fall,
  } = useGame();
  useInterval(() => fall(), isStarted ? delay : null);

  const fallDuration = isFlying ? 0.15 : 2.3;

  return (
    <motion.div
      className={`m-auto absolute z-40 ${
        !isStarted && "animate-pulse"
      }  w-10`}
      style={{
        ...position,
      }}
      animate={{
        ...position,
        ...animate,
      }}
      transition={{
        ease: "easeOut",
        duration: fallDuration,
      }}
    >
      <Bird />
    </motion.div>
  );
}