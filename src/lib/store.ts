/**
 * Tiny external store — sound preference + menu state.
 * No dependency: useSyncExternalStore is enough for two flags.
 */
import { useSyncExternalStore } from 'react';

export type SoundState = 'unknown' | 'on' | 'off';

type State = {
  menuOpen: boolean;
  sound: SoundState;
};

function initialSound(): SoundState {
  try {
    const saved = localStorage.getItem('sound');
    if (saved === 'on' || saved === 'off') return saved;
  } catch {
    /* ignore */
  }
  return 'unknown';
}

let state: State = { menuOpen: false, sound: initialSound() };

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  emit();
};

export const store = {
  get: () => state,
  setMenu: (menuOpen: boolean) => set({ menuOpen }),
  setSound: (sound: SoundState) => {
    try {
      if (sound !== 'unknown') localStorage.setItem('sound', sound);
    } catch {
      /* ignore */
    }
    set({ sound });
  },
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  toggleSound: () => store.setSound(state.sound === 'on' ? 'off' : 'on'),
};

export function useStore<T>(selector: (s: State) => T): T {
  const get = () => selector(store.get());
  return useSyncExternalStore(store.subscribe, get, get);
}
