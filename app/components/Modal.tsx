"use client";
import React, { useEffect } from "react";
import useGame from "@/hooks/useGame";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

interface ModalProps {
  show: boolean;
  onContinue: () => void;
  onExit: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onContinue, onExit }) => {
  
  const { rounds } = useGame();

  const score = _.last(rounds)?.score || 0;
  const best = _.maxBy(rounds, "score")?.score || 0;
    
    if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-0 flex-col mt-[-100px] select-none">
      <div>
        <Image src="/overbird.png" width={94} height={84} alt="game over" />
      </div>
      <div className="py-5">
        <Image src="/GAME OVER.png" width={231} height={35} alt="game over" />
      </div>
      <div className="bg-gradient-to-b from-[#EEEEEE] to-[#FFFFFF] shadow-[0px_4px_0px_0px_#CACACA] px-[10px] py-5 rounded-[10px] w-[326px] flex flex-col">
        <div className="flex">
          <div className="flex-[50%] flex-col">
            <p className="flex justify-center items-center text-[#DD523A] font-semibold text-sm">Your Score</p>
            <p className="flex justify-center items-center text-[#282828] font-bold text-2xl">{score}</p>
          </div>
          <div className="flex-[50%] flex-col border-l-2 border-[#CACACA]">
            <p className="flex justify-center items-center text-[#DD523A] font-semibold text-sm">Top Score</p>
            <p className="flex justify-center items-center text-[#282828] font-bold text-2xl">{best}</p>
          </div>
        </div>
        <div className="flex gap-[10px] pt-5">
          <Link
            href="/#"
            onClick={onExit}
            className="flex-[50%] w-full flex justify-center items-center space-x-2 bg-gradient-to-b from-[#DD523A] to-[#C24934] shadow-[0px_4px_0px_0px_#AB402D] text-white px-[15px] py-[10px] rounded-[10px] font-bold"
          >
            Quit
          </Link>
          <button
            onClick={onContinue}
            className="flex-[50%] flex items-center justify-center space-x-2 bg-gradient-to-b from-[#FA9B0A] to-[#EB6D13] shadow-[0px_4px_0px_0px_#DC6E09] text-white px-[15px] py-[10px] rounded-[10px]"
          >
            <Image src="/play.png" width={17} height={17} alt="playIcon" />
            <p className="mr-[7px]">Play again</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
