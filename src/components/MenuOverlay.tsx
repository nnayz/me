/**
 * Full-screen navigation. Opens as a masked panel; links stagger in with a
 * split-text-style rise. Primary nav lives here (the chrome stays quiet).
 */
import { play } from '@/lib/audio';
import { EASE_EXPO, EASE_INOUT } from '@/lib/motion';
import { store, useStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const pages = [
  { label: 'home', to: '/' },
  { label: 'highlights', to: '/work' },
  { label: 'writing', to: '/writing' },
  { label: 'resources', to: '/resources' },
];

const socials = [
  { href: 'https://github.com/nnayz', label: 'github' },
  { href: 'https://www.linkedin.com/in/nasrul-hudaa/', label: 'linkedin' },
  { href: 'https://x.com/nnasrrull', label: 'x' },
  { href: 'mailto:nasrul.huda.ds@gmail.com', label: 'email' },
];

export default function MenuOverlay() {
  const open = useStore((s) => s.menuOpen);
  const location = useLocation();

  // Close on route change and on Escape.
  useEffect(() => {
    store.setMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && store.setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          className="pointer-events-auto fixed inset-0 z-[60] flex flex-col justify-center bg-neutral-950 px-8 text-neutral-50 sm:px-16 md:px-24"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease: EASE_INOUT }}
        >
          <nav aria-label="Primary" className="flex flex-col gap-1">
            {pages.map((p, i) => {
              const active = isActive(location.pathname, p.to);
              return (
                <div className="overflow-hidden" key={p.to}>
                  <motion.div
                    animate={{ y: 0 }}
                    initial={{ y: '110%' }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 0.8,
                      ease: EASE_EXPO,
                    }}
                  >
                    <Link
                      className="group flex items-baseline gap-4 py-1 [font-family:var(--font-display)]"
                      onMouseEnter={() => play('hover')}
                      to={p.to}
                    >
                      <span
                        className="font-bold tracking-[-0.04em] transition-opacity"
                        style={{
                          fontSize: 'clamp(2.5rem, 9vw, 6rem)',
                          lineHeight: 0.98,
                          opacity: active ? 1 : 0.55,
                        }}
                      >
                        {p.label}
                      </span>
                      {active && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
                      )}
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </nav>

          <motion.div
            animate={{ opacity: 1 }}
            className="mt-14 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs lowercase"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            {socials.map((s) => (
              <a
                className="text-white/50 transition-colors hover:text-white"
                href={s.href}
                key={s.label}
                onMouseEnter={() => play('hover')}
                rel="noopener noreferrer"
                target="_blank"
              >
                {s.label} ↗
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function isActive(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to);
}
