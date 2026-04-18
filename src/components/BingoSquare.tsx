import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const base = 'relative flex items-center justify-center p-2 text-center rounded-lg transition-all duration-200 select-none min-h-[72px]';

  const normal = 'bg-surface/30 border border-[rgba(255,45,149,0.04)] text-gray-200';
  const marked = 'bg-[rgba(255,45,149,0.14)] border-[rgba(255,45,149,0.16)] text-white shadow-[0_6px_18px_rgba(255,45,149,0.06)]';
  const winningStyle = 'bg-gradient-to-tr from-[#FF2D95] via-[#6EE7FF] to-[#8B5CF6] text-black font-bold shadow-neon scale-105';

  const stateClass = square.isMarked ? (isWinning ? winningStyle : marked) : normal;
  const freeClass = square.isFreeSpace ? 'font-semibold text-sm opacity-95' : 'text-sm';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
      className={`${base} ${stateClass} ${freeClass} neon-glow`}
    >
      <div className="px-2">
        <span className="break-words leading-tight">{square.text}</span>
      </div>

      {/* Visual check / mark */}
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-2 right-2 text-xs text-white opacity-95 animate-pulse">✓</span>
      )}

      {/* Winning pulse */}
      {isWinning && (
        <span className="absolute inset-0 pointer-events-none opacity-30 animate-ping bg-gradient-to-r from-[#FF2D95] via-[#6EE7FF] to-[#8B5CF6]"></span>
      )}
    </button>
  );
}
