import { useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { WelcomeTour } from './components/WelcomeTour';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  const [showTour, setShowTour] = useState(() => {
    try {
      return !localStorage.getItem('bingo_tour_shown');
    } catch {
      return true;
    }
  });

  function closeTour() {
    try { localStorage.setItem('bingo_tour_shown', '1'); } catch { /* ignore */ }
    setShowTour(false);
  }

  if (gameState === 'start') {
    return (
      <>
        <StartScreen onStart={startGame} />
        {showTour && <WelcomeTour onClose={closeTour} />}
      </>
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
      {showTour && <WelcomeTour onClose={closeTour} />}
    </>
  );
}

export default App;

