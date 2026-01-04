/**
 * BentoGrid Component
 * 
 * A reusable asymmetric grid layout inspired by bento box designs.
 * Used for both Photography and Highlights pages.
 * 
 * Features:
 * - Predefined span patterns for visual variety
 * - CSS Grid with auto-rows
 * - Responsive column counts
 * - Staggered animations
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/className';

// Bento grid span patterns - creates asymmetric, curated layout
// Each pattern defines [colSpan, rowSpan] for different grid positions
// Responsive: base (mobile) / md+ (desktop)
const BENTO_PATTERNS = [
  { col: 'col-span-2 md:col-span-3 lg:col-span-4', row: 'row-span-2' },  // Extra wide feature
  { col: 'col-span-2 md:col-span-2', row: 'row-span-1' },  // Wide
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-3', row: 'row-span-2' },  // Large
  { col: 'col-span-2 md:col-span-2', row: 'row-span-1' },  // Wide
  { col: 'col-span-1', row: 'row-span-2' },  // Tall
  { col: 'col-span-2 md:col-span-3 lg:col-span-4', row: 'row-span-2' },  // Extra wide feature
  { col: 'col-span-1', row: 'row-span-1' },  // Small
];

export interface BentoGridProps {
  children: ReactNode[];
  className?: string;
  /** Number of columns at different breakpoints */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Row height at different breakpoints */
  rowHeight?: {
    base?: number;
    sm?: number;
    md?: number;
  };
}

export function BentoGrid({ 
  children, 
  className,
  columns = { sm: 4, md: 5, lg: 6 },
  gap = 'md',
  rowHeight = { base: 120, sm: 140, md: 160 },
}: BentoGridProps) {
  const gapClasses = {
    sm: 'gap-1.5 sm:gap-2',
    md: 'gap-2 sm:gap-3',
    lg: 'gap-3 sm:gap-4',
  };

  // Use explicit Tailwind classes for proper JIT compilation
  const getColumnClasses = () => {
    const base = 'grid-cols-2';
    const sm = columns.sm === 3 ? 'sm:grid-cols-3' : columns.sm === 4 ? 'sm:grid-cols-4' : columns.sm === 5 ? 'sm:grid-cols-5' : columns.sm === 6 ? 'sm:grid-cols-6' : '';
    const md = columns.md === 3 ? 'md:grid-cols-3' : columns.md === 4 ? 'md:grid-cols-4' : columns.md === 5 ? 'md:grid-cols-5' : columns.md === 6 ? 'md:grid-cols-6' : '';
    const lg = columns.lg === 3 ? 'lg:grid-cols-3' : columns.lg === 4 ? 'lg:grid-cols-4' : columns.lg === 5 ? 'lg:grid-cols-5' : columns.lg === 6 ? 'lg:grid-cols-6' : '';
    return cn(base, sm, md, lg);
  };

  return (
    <div 
      className={cn(
        'grid',
        getColumnClasses(),
        gapClasses[gap],
        className,
      )}
      style={{
        gridAutoRows: `minmax(${rowHeight.base}px, auto)`,
      }}
    >
      {children}
    </div>
  );
}

export interface BentoGridItemProps {
  children: ReactNode;
  index: number;
  className?: string;
  /** Override the default pattern */
  span?: { col?: string; row?: string };
  /** Animation delay multiplier */
  delayMultiplier?: number;
}

export function BentoGridItem({ 
  children, 
  index, 
  className,
  span,
  delayMultiplier = 0.05,
}: BentoGridItemProps) {
  const pattern = BENTO_PATTERNS[index % BENTO_PATTERNS.length];
  const colSpan = span?.col || pattern.col;
  const rowSpan = span?.row || pattern.row;

  return (
    <motion.div
      className={cn(colSpan, rowSpan, className)}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * delayMultiplier, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image card for use within BentoGrid
 * Handles lazy loading, hover effects, and overlays
 */
export interface BentoImageCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: string;
  href?: string;
  onClick?: () => void;
  showOverlayOnHover?: boolean;
  topRightElement?: ReactNode;
  className?: string;
}

export function BentoImageCard({
  src,
  alt,
  title,
  subtitle,
  meta,
  href,
  onClick,
  showOverlayOnHover = true,
  topRightElement,
  className,
}: BentoImageCardProps) {
  const Content = (
    <div
      className={cn(
        'group relative w-full h-full overflow-hidden rounded-sm',
        'bg-black/5 dark:bg-white/5',
        'flex items-center justify-center',
        'transition-all duration-300',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {/* Image with lazy loading - preserves aspect ratio */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          'w-full h-full object-contain',
          'transition-all duration-500',
          'group-hover:scale-[1.03]',
        )}
      />
      
      {/* Hover overlay */}
      {showOverlayOnHover && (
        <div className={cn(
          'absolute inset-0',
          'bg-gradient-to-t from-black/70 via-transparent to-transparent',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300',
        )} />
      )}
      
      {/* Content on hover */}
      {(title || subtitle || meta) && (
        <div className={cn(
          'absolute bottom-0 left-0 right-0 p-2 sm:p-3',
          'opacity-0 group-hover:opacity-100',
          'translate-y-1 group-hover:translate-y-0',
          'transition-all duration-300',
        )}>
          {title && (
            <p className="text-white text-[10px] sm:text-xs font-semibold font-[family-name:var(--font-display)] tracking-tight line-clamp-1">
              {title}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-white/70 mt-0.5">
            {subtitle && <span>{subtitle}</span>}
            {subtitle && meta && <span>·</span>}
            {meta && <span className="truncate">{meta}</span>}
          </div>
        </div>
      )}
      
      {/* Top right element (e.g., icons) */}
      {topRightElement && (
        <div className={cn(
          'absolute top-2 right-2',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300',
        )}>
          {topRightElement}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full h-full"
      >
        {Content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button className="block w-full h-full text-left focus:outline-none">
        {Content}
      </button>
    );
  }

  return Content;
}

