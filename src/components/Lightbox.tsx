/**
 * Lightbox Component
 * 
 * A modal overlay for viewing full-resolution images.
 * Features:
 * - Smooth enter/exit animations
 * - Keyboard navigation (Escape to close, arrows to navigate)
 * - Click outside to close
 * - Caption and metadata display
 * - Link to original Instagram post
 */

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/className';
import { InstagramPost, formatPostDate } from '@/lib/instagram';

interface LightboxProps {
  post: InstagramPost | null;
  carouselIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function Lightbox({ post, carouselIndex = 0, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  // Get the current image URL (handles carousel posts)
  const getCurrentImageUrl = () => {
    if (!post) return '';
    
    if (post.media_type === 'CAROUSEL_ALBUM' && post.children?.data) {
      const imageChildren = post.children.data.filter(c => c.media_type === 'IMAGE');
      const currentImage = imageChildren[carouselIndex];
      return currentImage?.media_url || post.media_url;
    }
    
    return post.media_url;
  };
  
  const getCarouselInfo = () => {
    if (post?.media_type === 'CAROUSEL_ALBUM' && post.children?.data) {
      const imageChildren = post.children.data.filter(c => c.media_type === 'IMAGE');
      return {
        current: carouselIndex + 1,
        total: imageChildren.length,
        hasMultiple: imageChildren.length > 1,
      };
    }
    return null;
  };
  
  const carouselInfo = getCarouselInfo();
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight' && onNext) onNext();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col md:flex-row gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-shrink-0 max-h-[70vh] md:max-h-[85vh]">
              <img
                src={getCurrentImageUrl()}
                alt={post.caption || 'Photography'}
                className="max-w-full max-h-[70vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-sm"
              />
              {/* Carousel indicator */}
              {carouselInfo && carouselInfo.hasMultiple && (
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {carouselInfo.current} / {carouselInfo.total}
                </div>
              )}
            </div>
            
            {/* Sidebar info */}
            <div className="flex flex-col justify-between w-full md:w-64 flex-shrink-0 text-white">
              <div className="space-y-3">
                {/* Caption */}
                {post.caption && (
                  <p className="text-sm leading-relaxed text-white/90">
                    {post.caption}
                  </p>
                )}
                
                {/* Date */}
                <p className="text-xs text-white/50">
                  {formatPostDate(post.timestamp)}
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5',
                    'text-xs font-medium text-white/70 hover:text-white',
                    'border border-white/20 hover:border-white/40',
                    'transition-all duration-150',
                  )}
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>View on Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4 z-20',
              'w-8 h-8 flex items-center justify-center',
              'text-white/60 hover:text-white',
              'transition-colors duration-150',
            )}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation arrows */}
          {onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 z-20',
                'w-10 h-10 flex items-center justify-center',
                'text-white/40 hover:text-white',
                'transition-colors duration-150',
              )}
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
          
          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2 z-20',
                'w-10 h-10 flex items-center justify-center',
                'text-white/40 hover:text-white',
                'transition-colors duration-150',
              )}
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
