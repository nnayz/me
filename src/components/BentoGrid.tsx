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

// Moodboard-style patterns - varied sizes for organic, curated feel
// Creates visual rhythm with mix of small, medium, large, and feature items
// Optimized for 10-column layout on large screens
const BENTO_PATTERNS = [
  { col: 'col-span-2 md:col-span-2 lg:col-span-2', row: 'row-span-1' },  // Small-medium
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-3 lg:col-span-4', row: 'row-span-2' },  // Large feature
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-2 lg:col-span-2', row: 'row-span-1' },  // Medium
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-2 lg:col-span-3', row: 'row-span-1' },  // Medium-wide
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-3 lg:col-span-5', row: 'row-span-2' },  // Extra wide feature
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-2 lg:col-span-2', row: 'row-span-1' },  // Medium
  { col: 'col-span-1', row: 'row-span-2' },  // Tall
  { col: 'col-span-2 md:col-span-2 lg:col-span-2', row: 'row-span-1' },  // Medium
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-1', row: 'row-span-1' },  // Small
  { col: 'col-span-2 md:col-span-3 lg:col-span-4', row: 'row-span-1' },  // Wide
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
    sm: 'gap-0.5 sm:gap-1',
    md: 'gap-1 sm:gap-1.5',
    lg: 'gap-1.5 sm:gap-2',
  };

  // Use explicit Tailwind classes for proper JIT compilation
  const getColumnClasses = () => {
    const base = 'grid-cols-2';
    const sm = columns.sm === 3 ? 'sm:grid-cols-3' : columns.sm === 4 ? 'sm:grid-cols-4' : columns.sm === 5 ? 'sm:grid-cols-5' : columns.sm === 6 ? 'sm:grid-cols-6' : columns.sm === 7 ? 'sm:grid-cols-7' : columns.sm === 8 ? 'sm:grid-cols-8' : columns.sm === 9 ? 'sm:grid-cols-9' : columns.sm === 10 ? 'sm:grid-cols-10' : '';
    const md = columns.md === 3 ? 'md:grid-cols-3' : columns.md === 4 ? 'md:grid-cols-4' : columns.md === 5 ? 'md:grid-cols-5' : columns.md === 6 ? 'md:grid-cols-6' : columns.md === 7 ? 'md:grid-cols-7' : columns.md === 8 ? 'md:grid-cols-8' : columns.md === 9 ? 'md:grid-cols-9' : columns.md === 10 ? 'md:grid-cols-10' : '';
    const lg = columns.lg === 3 ? 'lg:grid-cols-3' : columns.lg === 4 ? 'lg:grid-cols-4' : columns.lg === 5 ? 'lg:grid-cols-5' : columns.lg === 6 ? 'lg:grid-cols-6' : columns.lg === 7 ? 'lg:grid-cols-7' : columns.lg === 8 ? 'lg:grid-cols-8' : columns.lg === 9 ? 'lg:grid-cols-9' : columns.lg === 10 ? 'lg:grid-cols-10' : '';
    return cn(base, sm, md, lg);
  };

  return (
    <div 
      className={cn(
        'grid',
        'h-[calc(100vh-12rem)] sm:h-[calc(100vh-14rem)]',
        'overflow-hidden',
        'auto-rows-fr', // Use fractional units for equal distribution
        getColumnClasses(),
        gapClasses[gap],
        className,
      )}
      style={{
        gridAutoRows: `minmax(${rowHeight.base}px, 1fr)`, // Minimum height but can grow to fill space
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
  delayMultiplier = 0.03,
}: BentoGridItemProps) {
  const pattern = BENTO_PATTERNS[index % BENTO_PATTERNS.length];
  const colSpan = span?.col || pattern.col;
  const rowSpan = span?.row || pattern.row;
  
  // More varied rotations for organic moodboard feel
  const rotations = [
    'rotate-[-1deg]',
    'rotate-[0.8deg]',
    'rotate-[-0.6deg]',
    'rotate-[1.2deg]',
    'rotate-[-0.4deg]',
    '', // No rotation
    'rotate-[0.5deg]',
    'rotate-[-0.7deg]',
  ];
  const rotation = rotations[index % rotations.length];
  
  // Vary z-index for layered effect
  const zIndex = index % 8 < 2 ? 'z-10' : index % 8 < 4 ? 'z-5' : 'z-0';

  return (
    <motion.div
      className={cn(
        colSpan, 
        rowSpan, 
        rotation,
        zIndex,
        'transition-all duration-300 hover:z-30 hover:scale-[1.02]',
        className
      )}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * delayMultiplier, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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

