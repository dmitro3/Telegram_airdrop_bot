'use client'

import Game from "../components/Game";
import { GameProvider } from "../hooks/useGame";

export default function Home() {
  return (
      <GameProvider>
        <Game />
      </GameProvider>
  );
}
