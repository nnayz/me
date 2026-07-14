/**
 * Quiet edge chrome: a small logo mark top-left, and a menu pill + theme
 * toggle top-right. Primary navigation lives in the menu overlay.
 */
import { play } from '@/lib/audio';
import { cn } from '@/lib/className';
import { store, useStore } from '@/lib/store';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const menuOpen = useStore((s) => s.menuOpen);

  return (
    <motion.nav
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 left-4 z-[70] flex items-center justify-between sm:top-6 sm:right-6 sm:left-6 md:right-8 md:left-8 lg:right-12 lg:left-12"
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo mark → home */}
      <Link
        aria-label="Home"
        className={cn(
          'pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full',
          'text-xs font-bold lowercase [font-family:var(--font-display)]',
          'transition-colors',
          menuOpen
            ? 'bg-white text-neutral-950'
            : 'bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950',
        )}
        onMouseEnter={() => play('hover')}
        to="/"
      >
        nh
      </Link>

      <div className="flex items-center gap-2">
        <button
          aria-label="Toggle theme"
          className={cn(
            'pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full',
            'border border-black/15 text-tertiary transition-colors dark:border-white/15',
            'hover:text-primary',
            menuOpen && 'border-white/25 text-white/70 hover:text-white',
          )}
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          type="button"
        >
          {resolvedTheme === 'dark' ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </button>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={cn(
            'pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2',
            'font-mono text-xs lowercase transition-colors',
            menuOpen
              ? 'bg-white text-neutral-950'
              : 'bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950',
          )}
          onClick={() => {
            play('open');
            store.setMenu(!menuOpen);
          }}
          type="button"
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-colors',
              menuOpen ? 'bg-neutral-950' : 'bg-neutral-50 dark:bg-neutral-950',
            )}
          />
          {menuOpen ? 'close' : 'menu'}
        </button>
      </div>
    </motion.nav>
  );
}
