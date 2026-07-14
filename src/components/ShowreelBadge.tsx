/**
 * Rotating stamp, pinned bottom-left — a quiet always-there route into the
 * work. The ring spins slowly; it holds still under reduced motion.
 */
import { play } from '@/lib/audio';
import { Link } from 'react-router-dom';

export default function ShowreelBadge() {
  return (
    <Link
      aria-label="View highlights"
      className="group pointer-events-auto fixed bottom-4 left-4 z-40 hidden sm:bottom-6 sm:left-6 md:left-8 md:block"
      onMouseEnter={() => play('hover')}
      to="/work"
    >
      <div className="relative h-16 w-16">
        <svg
          className="h-full w-full motion-safe:animate-[spin_14s_linear_infinite]"
          viewBox="0 0 100 100"
        >
          <defs>
            <path
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              id="badge-ring"
            />
          </defs>
          <text className="fill-current text-tertiary text-[10.5px] tracking-[0.28em] uppercase">
            <textPath href="#badge-ring">
              highlights · selected work ·
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary transition-transform duration-300 group-hover:scale-110">
            ↗
          </span>
        </span>
      </div>
    </Link>
  );
}
