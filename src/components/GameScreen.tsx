import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';
import useSound from '../hooks/useSound';
import { useEffect } from 'react';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  const { muted, toggleMute, play } = useSound();

  useEffect(() => {
    if (hasBingo) play('victory');
  }, [hasBingo]);

  function handleSquareClick(id: number) {
    play('click');
    onSquareClick(id);
  }

  return (
    <div className="flex flex-col min-h-full bg-cp-bg text-white">
      <header className="flex items-center justify-between p-4 bg-surface/60 border-b border-[rgba(255,45,149,0.08)] shadow-neon">
        <button
          onClick={onReset}
          aria-label="Back / Reset"
          className="px-3 py-2 rounded-md text-sm text-gray-100 hover:brightness-105 neon-glow"
        >
          ← Back
        </button>

        <h1 className="text-xl font-extrabold neon-text">Bingo Mixer</h1>

        <div className="w-20 text-right">
          <button
            onClick={toggleMute}
            aria-pressed={muted}
            className="px-2 py-1 rounded-md btn-neon text-sm neon-glow"
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      <div className="px-4 py-3">
        <p className="max-w-prose mx-auto text-center text-gray-300 text-sm">
          Tap a square when you find someone who matches it. Aim for 5 in a row — good luck!
        </p>
      </div>

      {hasBingo && (
        <div
          role="status"
          aria-live="polite"
          className="mx-4 mb-4 rounded-lg bg-gradient-to-r from-[#FF2D95] via-[#6EE7FF] to-[#8B5CF6] text-black font-semibold py-3 text-center shadow-neon"
        >
          🎉 BINGO! You got a line!
        </div>
      )}

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <BingoBoard
            board={board}
            winningSquareIds={winningSquareIds}
            onSquareClick={handleSquareClick}
          />
        </div>
      </main>

      <footer className="p-4">
        <div className="max-w-3xl mx-auto flex justify-end">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-md bg-[rgba(255,45,149,0.12)] text-white text-sm hover:brightness-105 neon-glow"
          >
            Reset Game
          </button>
        </div>
      </footer>
    </div>
  );
}
