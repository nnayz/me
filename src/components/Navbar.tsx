import { actions } from '@data/cmd';
import { cn } from '@/lib/className';
import {
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();

  const navigationItems = actions.filter((action) => action.section === 'Navigation');

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'fixed top-4 left-4 right-4 z-50 sm:top-6 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12',
      )}
    >
      <div className="flex items-center justify-between px-1 py-2 sm:px-2">
        {/* Navigation Links - Tavus Style */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navigationItems.map((action, i) => {
            const active = isActive(action.href || '/');
            return (
              <Link
                key={i}
                to={action.href || '/'}
              >
                <motion.div
                  whileHover={{ y: -2, x: -2 }}
                  whileTap={{ y: 0, x: 0 }}
                  className={cn(
                    'flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5',
                    'transition-all duration-100',
                    'font-semibold text-[11px] sm:text-xs tracking-wide uppercase',
                    'font-[family-name:var(--font-display)]',
                    active 
                      ? 'border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.9)] bg-black text-white dark:bg-white dark:text-black'
                      : 'border border-black/50 dark:border-white/50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] bg-transparent text-black dark:text-white hover:border-black dark:hover:border-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.9)] hover:bg-white/50 dark:hover:bg-black/50',
                  )}
                >
                  <div 
                    className={cn(
                      'w-1.5 h-1.5 sm:w-2 sm:h-2 flex-shrink-0',
                      active ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{ backgroundColor: action.color }}
                  />
                  <span>{action.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Right Side - Theme Toggle */}
        <motion.button
          whileHover={{ y: -2, x: -2 }}
          whileTap={{ y: 0, x: 0 }}
          onClick={toggleTheme}
          className={cn(
            'flex items-center justify-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5',
            'border border-black/50 dark:border-white/50',
            'shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]',
            'bg-transparent text-black dark:text-white',
            'hover:border-black dark:hover:border-white',
            'hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.9)]',
            'hover:bg-white/50 dark:hover:bg-black/50',
            'transition-all duration-100',
          )}
          aria-label="Toggle theme"
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#EC79F9]" />
          {resolvedTheme === 'dark' ? (
            <SunIcon className="h-3.5 w-3.5" />
          ) : (
            <MoonIcon className="h-3.5 w-3.5" />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}
