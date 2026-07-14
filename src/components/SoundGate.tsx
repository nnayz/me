/**
 * Entry loader + sound gate. Shows once (until the user picks a preference),
 * then never blocks again. Sound is strictly opt-in.
 */
import { initAudio, play } from '@/lib/audio';
import { useStore, store } from '@/lib/store';
import { EASE_EXPO } from '@/lib/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SoundGate() {
  const sound = useStore((s) => s.sound);
  const [ready, setReady] = useState(false);

  // Brief "loading the stage" beat before offering the choice.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  const choose = (on: boolean) => {
    store.setSound(on ? 'on' : 'off');
    initAudio();
    if (on) play('enter');
  };

  return (
    <AnimatePresence>
      {sound === 'unknown' && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 text-neutral-50"
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          <motion.div
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-10 px-6 text-center"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              <p className="font-mono text-xs tracking-widest text-white/50 uppercase">
                {ready ? 'ready' : 'loading the stage'}
              </p>
            </div>

            <AnimatePresence>
              {ready && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-6"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO }}
                >
                  <p className="max-w-xs text-lg [font-family:var(--font-display)]">
                    This is best with sound on. Your call.
                  </p>
                  <div className="flex items-center gap-3">
                    <GateButton onClick={() => choose(true)} primary>
                      enter with sound
                    </GateButton>
                    <GateButton onClick={() => choose(false)}>
                      enter silent
                    </GateButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GateButton({
  children,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      className={
        'rounded-full px-5 py-2 font-mono text-xs lowercase transition-colors ' +
        (primary
          ? 'bg-white text-neutral-950 hover:bg-white/85'
          : 'border border-white/25 text-white/70 hover:border-white/50 hover:text-white')
      }
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
