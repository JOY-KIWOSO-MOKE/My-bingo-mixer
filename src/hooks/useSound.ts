import { useEffect, useRef, useState, useCallback } from 'react';

type SoundName = 'click' | 'victory';

interface WindowWithAudio {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

export function useSound() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('bingo_sound_muted') === '1';
    } catch (e) {
      console.debug('localStorage read failed', e);
      return false;
    }
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  function ensureCtx() {
    if (audioCtxRef.current) return audioCtxRef.current;
    const win = window as unknown as WindowWithAudio;
    const C = win.AudioContext || win.webkitAudioContext;
    if (!C) return null;
    audioCtxRef.current = new C();
    return audioCtxRef.current;
  }

  const playClick = useCallback(() => {
    if (muted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.12);
  }, [muted]);

  const playVictory = useCallback(() => {
    if (muted) return;
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime + 0.02;
    const freqs = [660, 880, 990];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = now + i * 0.06;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.5);
    });
  }, [muted]);

  const play = useCallback((name: SoundName) => {
    if (name === 'click') playClick();
    if (name === 'victory') playVictory();
  }, [playClick, playVictory]);

  const toggleMute = useCallback(() => {
    const v = !muted;
    setMuted(v);
    try { localStorage.setItem('bingo_sound_muted', v ? '1' : '0'); } catch (e) { console.debug('localStorage write failed', e); }
  }, [muted]);

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch (e) {
        console.debug('closing audio context failed', e);
      }
      audioCtxRef.current = null;
    };
  }, []);

  return { muted, toggleMute, play } as const;
}

export default useSound;
