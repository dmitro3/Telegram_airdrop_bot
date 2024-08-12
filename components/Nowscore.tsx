import React from "react";
import useGame from "../hooks/useGame";
import _ from "lodash";

export default function NowScore() {
  const { rounds } = useGame();

  const score = _.last(rounds)?.score || 0;

  return (
    <section>
      <div className="flex justify-center font-extrabold text-white text-5xl w-full z-50 pt-6 absolute">
        <div>{score}</div>
      </div>
      <div className="absolute flex justify-end font-extrabold text-white w-full pr-6 pt-6 z-50">
        <span className="flex items-center"><img src="/bird.png" className="w-6 h-6" alt="" /></span>
        <span className="ml-[6px] text-[20px] mr-1">X</span>
        <span className="text-[20px]">3</span>
      </div>
    </section>
  );
}
