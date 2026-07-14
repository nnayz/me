/**
 * UI sound — synthesised WebAudio blips. No files, no Howler dependency.
 * Everything no-ops unless the user opted into sound via the entry gate.
 */
import { store } from './store';

type Blip = 'hover' | 'toggle' | 'open' | 'enter';

const specs: Record<
  Blip,
  { dur: number; freq: number; gain: number; type: OscillatorType }
> = {
  enter: { dur: 0.5, freq: 196, gain: 0.06, type: 'sine' },
  hover: { dur: 0.05, freq: 880, gain: 0.025, type: 'sine' },
  open: { dur: 0.2, freq: 320, gain: 0.05, type: 'sine' },
  toggle: { dur: 0.07, freq: 540, gain: 0.045, type: 'triangle' },
};

let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ?? (window as unknown as any).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

/** Resume the context after a user gesture (autoplay policy). */
export function initAudio() {
  const ac = context();
  if (ac && ac.state === 'suspended') void ac.resume();
}

export function play(name: Blip) {
  if (store.get().sound !== 'on') return;
  const ac = context();
  if (!ac) return;
  if (ac.state === 'suspended') void ac.resume();

  const { dur, freq, gain, type } = specs[name];
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur);
}
