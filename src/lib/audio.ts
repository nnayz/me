/**
 * UI sound — synthesised WebAudio blips. No files, no Howler dependency.
 * Everything no-ops unless the user opted into sound via the entry gate.
 *
 * Softness comes from three things: a slow attack (a fast one reads as a
 * click), a lowpass filter that takes the edge off the tone, and a long
 * exponential tail so notes fade rather than stop.
 */
import { store } from './store';

type Blip = 'hover' | 'toggle' | 'open' | 'enter' | 'grid';

type GridNoteOptions = {
  /** Schedule slightly ahead of time for a stable sequencer clock. */
  delay?: number;
  /** 0–1 loudness multiplier for fading sequence notes. */
  gain?: number;
  /** Stereo position from left (-1) to right (1). */
  pan?: number;
};

type Spec = {
  /** Seconds to reach full gain. Below ~20ms you hear the onset as a tick. */
  attack: number;
  /** Lowpass corner, Hz. */
  cutoff: number;
  dur: number;
  freq: number;
  gain: number;
  /** Optional target frequency — the note glides to it over its life. */
  glide?: number;
  type: OscillatorType;
};

const specs: Record<Blip, Spec> = {
  enter: {
    attack: 0.12,
    cutoff: 900,
    dur: 1.6,
    freq: 196,
    gain: 0.05,
    glide: 261.63,
    type: 'sine',
  },
  grid: {
    attack: 0.02,
    cutoff: 1200,
    dur: 0.22,
    freq: 523.25,
    gain: 0.005,
    type: 'sine',
  },
  hover: {
    attack: 0.03,
    cutoff: 1400,
    dur: 0.32,
    freq: 523.25,
    gain: 0.014,
    type: 'sine',
  },
  open: {
    attack: 0.05,
    cutoff: 1000,
    dur: 0.75,
    freq: 261.63,
    gain: 0.045,
    glide: 392,
    type: 'sine',
  },
  toggle: {
    attack: 0.025,
    cutoff: 1200,
    dur: 0.4,
    freq: 392,
    gain: 0.03,
    type: 'triangle',
  },
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const lastPlayed: Partial<Record<Blip, number>> = {};

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ?? (window as unknown as any).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);
  }
  return ctx;
}

/** Resume the context after a user gesture (autoplay policy). */
export function initAudio() {
  const ac = context();
  if (ac && ac.state === 'suspended') void ac.resume();
}

export function play(name: Blip, detune = 0) {
  if (store.get().sound !== 'on') return;
  const ac = context();
  if (!ac || !master) return;
  if (ac.state === 'suspended') void ac.resume();

  // Hovering across a list retriggers fast enough to stack into a buzz.
  const now = ac.currentTime;
  if (now - (lastPlayed[name] ?? -1) < 0.06) return;
  lastPlayed[name] = now;

  const { attack, cutoff, dur, freq, gain, glide, type } = specs[name];
  const osc = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const g = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  osc.detune.setValueAtTime(detune, now);
  if (glide) osc.frequency.exponentialRampToValueAtTime(glide, now + dur * 0.7);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(cutoff, now);
  filter.Q.value = 0.7;

  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(gain, now + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  osc.connect(filter);
  filter.connect(g);
  g.connect(master);
  osc.start(now);
  // Stop a beat past the fade so the tail is never cut mid-decay.
  osc.stop(now + dur + 0.05);
}

/**
 * A soft, piano-like voice for the background sequencer. It deliberately has
 * no retrigger throttle: several rows in one column should sound as a chord.
 */
export function playGridNote(
  detune = 0,
  { delay = 0, gain: gainScale = 1, pan = 0 }: GridNoteOptions = {},
) {
  if (store.get().sound !== 'on') return;
  const ac = context();
  if (!ac || !master) return;
  if (ac.state === 'suspended') void ac.resume();

  const now = ac.currentTime + Math.min(Math.max(delay, 0), 0.2);
  const duration = 1.8;
  const frequency = 261.63 * Math.pow(2, detune / 1200);
  const voice = ac.createGain();
  const filter = ac.createBiquadFilter();
  const panner = ac.createStereoPanner();
  const peak = 0.024 * Math.min(Math.max(gainScale, 0), 1);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(
    Math.min(3600, Math.max(1100, frequency * 4.5)),
    now,
  );
  filter.Q.value = 0.55;
  panner.pan.setValueAtTime(Math.min(Math.max(pan, -1), 1), now);

  voice.gain.setValueAtTime(0.0001, now);
  voice.gain.linearRampToValueAtTime(peak, now + 0.018);
  voice.gain.exponentialRampToValueAtTime(
    Math.max(peak * 0.3, 0.0001),
    now + 0.24,
  );
  voice.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  voice.connect(filter);
  filter.connect(panner);
  panner.connect(master);

  const partials = [
    { gain: 0.86, ratio: 1, type: 'sine' as OscillatorType },
    { gain: 0.1, ratio: 2, type: 'triangle' as OscillatorType },
    { gain: 0.04, ratio: 3, type: 'sine' as OscillatorType },
  ];

  for (const partial of partials) {
    if (frequency * partial.ratio > ac.sampleRate * 0.45) continue;
    const osc = ac.createOscillator();
    const partialGain = ac.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(frequency * partial.ratio, now);
    partialGain.gain.value = partial.gain;
    osc.connect(partialGain);
    partialGain.connect(voice);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }
}
