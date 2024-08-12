"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import FlappyBird from "./FlappyBird";
import Footer from "./Footer";
import Background from "./Background";
import useGame from "../hooks/useGame";
import Pipes from "./Pipes";
import useElementSize from "../hooks/useElementSize";
import _ from "lodash";
export default function Game() {
  const { handleWindowClick, startGame, isReady, rounds } = useGame();
  const [ref, window] = useElementSize();
  useEffect(() => {
    if (window.width > 0 && window.height > 0) {
      startGame(window);
    }
  }, [window, ref]);

  return (
    <motion.main layout className="relative overflow-x-hidden h-full bg-white">
      <Background />
      <motion.div
        ref={ref}
        key={_.last(rounds)?.key || "initial"}
        onTap={handleWindowClick}
        className="h-[calc(100%-184px)] z-10 flex relative overflow-hidden cursor-pointer"
      >
        {isReady && (
          <>
            <Pipes />
            <FlappyBird />
          </>
        )}
      </motion.div>
      <Footer />
    </motion.main>
  );
}
