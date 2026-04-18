import { useState } from 'react';

interface WelcomeTourProps {
  onClose?: () => void;
}

export function WelcomeTour({ onClose }: WelcomeTourProps) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: 'Welcome to Bingo Mixer',
      text: 'A social bingo game to help people connect. Find people who match the questions and get 5 in a row!'
    },
    {
      title: 'How to Play',
      text: 'Tap a square when you find someone who matches the question. Mark 5 in a row to win.'
    },
    {
      title: 'Get Started',
      text: 'Press Start Game to generate a board and begin meeting new people. Good luck!'
    }
  ];

  function close() {
    try { localStorage.setItem('bingo_tour_shown', '1'); } catch { /* ignore */ }
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{steps[step].title}</h3>
        <p className="text-gray-700 mb-6">{steps[step].text}</p>

        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-3 py-2 rounded border text-sm mr-2 disabled:opacity-50"
            >
              Back
            </button>

            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="px-3 py-2 rounded bg-accent text-white text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="text-right">
            <button
              onClick={close}
              className="px-4 py-2 text-sm text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

