/**
 * PostDisplayer Component
 * 
 * Displays an Instagram post with all available metadata.
 * Shows image, caption, timestamp, post details, and carousel information.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/className';
import { InstagramPost, formatPostDate } from '@/lib/instagram';

interface PostDisplayerProps {
  post: InstagramPost;
  carouselIndex?: number;
  className?: string;
  showFullMetadata?: boolean;
}

export default function PostDisplayer({
  post,
  carouselIndex = 0,
  className,
  showFullMetadata = true,
}: PostDisplayerProps) {
  // Get the current image URL (handles carousel posts)
  const getCurrentImageUrl = () => {
    if (post.media_type === 'CAROUSEL_ALBUM' && post.children?.data) {
      const imageChildren = post.children.data.filter(c => c.media_type === 'IMAGE');
      const currentImage = imageChildren[carouselIndex];
      return currentImage?.media_url || post.media_url;
    }
    return post.media_url;
  };

  // Get carousel information
  const getCarouselInfo = () => {
    if (post.media_type === 'CAROUSEL_ALBUM' && post.children?.data) {
      const imageChildren = post.children.data.filter(c => c.media_type === 'IMAGE');
      const videoChildren = post.children.data.filter(c => c.media_type === 'VIDEO');
      return {
        totalImages: imageChildren.length,
        totalVideos: videoChildren.length,
        totalItems: post.children.data.length,
        currentIndex: carouselIndex,
        hasMultiple: post.children.data.length > 1,
        allImages: imageChildren,
      };
    }
    return null;
  };

  const carouselInfo = getCarouselInfo();
  const currentImageUrl = getCurrentImageUrl();

  // Format full timestamp
  const formatFullDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('w-full', className)}
    >
      <div className="bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-sm overflow-hidden">
        {/* Image Section */}
        <div className="relative aspect-square bg-black/5 dark:bg-white/5">
          <img
            src={currentImageUrl}
            alt={post.caption || 'Instagram post'}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          
          {/* Carousel indicator */}
          {carouselInfo && carouselInfo.hasMultiple && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z"/>
              </svg>
              <span>{carouselInfo.currentIndex + 1} / {carouselInfo.totalItems}</span>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Caption */}
          {post.caption && (
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Caption</h3>
              <p className="text-sm text-primary leading-relaxed whitespace-pre-wrap">
                {post.caption}
              </p>
            </div>
          )}

          {/* Divider */}
          {(post.caption || showFullMetadata) && (
            <div className="border-t border-black/10 dark:border-white/10" />
          )}

          {/* Full Metadata */}
          {showFullMetadata && (
            <div className="space-y-3">
              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Posted</h3>
                  <p className="text-sm text-primary">{formatPostDate(post.timestamp)}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Full Date</h3>
                  <p className="text-xs text-secondary">{formatFullDate(post.timestamp)}</p>
                </div>
              </div>

              {/* Media Type */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Media Type</h3>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-xs px-2 py-1 rounded',
                    post.media_type === 'CAROUSEL_ALBUM' 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  )}>
                    {post.media_type === 'CAROUSEL_ALBUM' ? 'Carousel Album' : 'Single Image'}
                  </span>
                </div>
              </div>

              {/* Carousel Details */}
              {carouselInfo && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Carousel Details</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-tertiary">Total Items:</span>
                      <span className="text-primary ml-1 font-medium">{carouselInfo.totalItems}</span>
                    </div>
                    <div>
                      <span className="text-tertiary">Images:</span>
                      <span className="text-primary ml-1 font-medium">{carouselInfo.totalImages}</span>
                    </div>
                    {carouselInfo.totalVideos > 0 && (
                      <div>
                        <span className="text-tertiary">Videos:</span>
                        <span className="text-primary ml-1 font-medium">{carouselInfo.totalVideos}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-tertiary">Current:</span>
                      <span className="text-primary ml-1 font-medium">{carouselInfo.currentIndex + 1}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Post ID */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Post ID</h3>
                <p className="text-xs text-secondary font-mono break-all">{post.id}</p>
              </div>

              {/* Permalink */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">Link</h3>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1.5 w-fit"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span className="break-all">{post.permalink}</span>
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Carousel Images List */}
              {carouselInfo && carouselInfo.allImages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wide">
                    All Images ({carouselInfo.allImages.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {carouselInfo.allImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={cn(
                          'relative aspect-square rounded overflow-hidden border-2 transition-all',
                          index === carouselInfo.currentIndex
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-black/10 dark:border-white/10 opacity-60 hover:opacity-100'
                        )}
                      >
                        <img
                          src={image.media_url}
                          alt={`Carousel image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === carouselInfo.currentIndex && (
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <div className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">
                              Current
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 text-center">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

