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
    },
    fall,
  } = useGame();
  useInterval(() => fall(), isStarted ? delay : null);
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
        duration: 0.15,
      }}
    >
      <Bird />
    </motion.div>
  );
}
