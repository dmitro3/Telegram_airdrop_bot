import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import useInterval from "../hooks/useInterval";

export default function Pipes() {
  const {
    isStarted,
    pipe: { delay },
    pipes: pipesArray,
    movePipes,
  } = useGame();
  useInterval(() => movePipes(), isStarted ? delay : null);
  return (
    <>
      {pipesArray.map((pipes, index) => (
        <div key={index}>
          <motion.div
            key={pipes.top.key}
            initial={pipes.top.initial}
            animate={pipes.top.position}
            style={{
              ...pipes.top.size,
              rotate: 180,
            }}
            className="absolute"
            transition={{
              ease: "easeOut",
              duration: 0.1
            }}
          >
            <Pipe />
          </motion.div>
          <motion.div
            key={pipes.bottom.key}
            initial={pipes.bottom.initial}
            animate={pipes.bottom.position}
            style={pipes.bottom.size}
            className="absolute"
            transition={{
              ease: "easeOut",
              duration: 0.1
            }}
          >
            <Pipe />
          </motion.div>
        </div>
      ))}
    </>
  );
}
export function Pipe() {
  return (
    <img src="pipe.png" className="h-full w-full pointer-events-none" alt="" />
  );
}
