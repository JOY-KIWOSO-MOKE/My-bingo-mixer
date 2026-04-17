import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="mx-auto w-full max-w-md p-3 bg-surface/50 rounded-lg shadow-neon border border-[rgba(255,45,149,0.06)]">
      <div
        role="grid"
        aria-label="Bingo board"
        className="grid grid-cols-5 gap-2 sm:gap-3 w-full aspect-square"
      >
        {board.map((square) => (
          <div role="gridcell" key={square.id} className="flex">
            <BingoSquare
              square={square}
              isWinning={winningSquareIds.has(square.id)}
              onClick={() => onSquareClick(square.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
