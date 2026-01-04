/**
 * Photography Page
 * 
 * Displays Instagram photos in two layout options:
 * - Bento Grid: Asymmetric, curated layout
 * - Profile View: Instagram-style profile grid
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/className';
import { fetchInstagramPosts, fetchInstagramProfile, InstagramPost, formatPostDate, expandCarouselPosts } from '@/lib/instagram';
import { BentoGrid, BentoGridItem, BentoImageCard } from '@components/BentoGrid';
import InstagramProfile from '@components/InstagramProfile';
import InstagramProfileSkeleton from '@components/InstagramProfileSkeleton';
import Lightbox from '@components/Lightbox';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

type ViewMode = 'bento' | 'profile';

export default function Photography() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [originalPosts, setOriginalPosts] = useState<InstagramPost[]>([]); // Store original posts for lightbox
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('profile');
  const [username, setUsername] = useState<string>('nasrultakesphotos');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      // Fetch posts and profile in parallel
      const [postsResult, profileResult] = await Promise.all([
        fetchInstagramPosts(25),
        fetchInstagramProfile(),
      ]);
      
      if (postsResult.error) {
        setError(postsResult.error);
      } else {
        // Store original posts for lightbox navigation
        setOriginalPosts(postsResult.posts);
        // Expand carousel posts into individual images for grid display
        setPosts(expandCarouselPosts(postsResult.posts));
      }
      
      // Set profile data
      if (profileResult.profile) {
        if (profileResult.profile.username) {
          setUsername(profileResult.profile.username);
        }
      }
      
      setLoading(false);
    }
    
    loadData();
  }, []);

  const openLightbox = (post: InstagramPost) => {
    // If this is an expanded carousel image, find the original carousel post
    if (post.carouselInfo) {
      const originalPost = originalPosts.find(p => p.id === post.carouselInfo!.parentId);
      if (originalPost) {
        setSelectedPost(originalPost);
        setSelectedCarouselIndex(post.carouselInfo.currentIndex);
        setLightboxOpen(true);
        return;
      }
    }
    
    // Regular post or carousel post (from profile view)
    setSelectedPost(post);
    setSelectedCarouselIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => {
      setSelectedPost(null);
      setSelectedCarouselIndex(0);
    }, 200);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!selectedPost) return;
    
    // Handle carousel navigation within a post
    if (selectedPost.media_type === 'CAROUSEL_ALBUM' && selectedPost.children?.data) {
      const imageChildren = selectedPost.children.data.filter(c => c.media_type === 'IMAGE');
      const newIndex = direction === 'next'
        ? (selectedCarouselIndex + 1) % imageChildren.length
        : (selectedCarouselIndex - 1 + imageChildren.length) % imageChildren.length;
      setSelectedCarouselIndex(newIndex);
      return;
    }
    
    // Navigate between different posts
    const currentIndex = originalPosts.findIndex(p => p.id === selectedPost.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % originalPosts.length 
      : (currentIndex - 1 + originalPosts.length) % originalPosts.length;
    setSelectedPost(originalPosts[newIndex]);
    setSelectedCarouselIndex(0);
  };

  return (
    <motion.div
      className="w-full"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Header - constrained */}
      <motion.div variants={fadeInUp} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-1">Photography</h1>
            <p className="text-tertiary text-[11px] sm:text-xs max-w-md">
              Moments captured through my lens. Updated from{' '}
              <a 
                href={`https://instagram.com/${username}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="underline decoration-black/20 dark:decoration-white/20 hover:decoration-black/50 dark:hover:decoration-white/50 transition-colors"
              >
                @{username}
              </a>
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-black/10 dark:border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('bento')}
              className={cn(
                'px-3 py-1 text-xs font-medium transition-all duration-150',
                viewMode === 'bento'
                  ? 'bg-black text-white dark:bg-white dark:text-black rounded'
                  : 'text-tertiary hover:text-primary'
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('profile')}
              className={cn(
                'px-3 py-1 text-xs font-medium transition-all duration-150',
                viewMode === 'profile'
                  ? 'bg-black text-white dark:bg-white dark:text-black rounded'
                  : 'text-tertiary hover:text-primary'
              )}
            >
              Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <>
          {viewMode === 'profile' ? (
            <InstagramProfileSkeleton />
          ) : (
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-2 sm:px-3 md:px-4">
              <BentoGrid columns={{ sm: 4, md: 5, lg: 6 }} gap="md" rowHeight={{ base: 120, sm: 140, md: 160 }}>
                {[...Array(8)].map((_, i) => (
                  <BentoGridItem key={i} index={i}>
                    <div className="w-full h-full bg-black/5 dark:bg-white/5 rounded-sm animate-pulse" />
                  </BentoGridItem>
                ))}
              </BentoGrid>
            </div>
          )}
        </>
      )}

      {/* Error state */}
      {error && !loading && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <p className="text-tertiary text-sm">{error}</p>
          <p className="text-quaternary text-xs mt-2">
            Please check back later or visit my Instagram directly.
          </p>
        </motion.div>
      )}

      {/* Content - Animated transition between views */}
      <AnimatePresence mode="wait">
        {!loading && !error && posts.length > 0 && (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === 'bento' ? (
              /* Bento Grid - full width breakout, floating moodboard style */
              <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-2 sm:px-4 md:px-16">
                <BentoGrid columns={{ sm: 5, md: 7, lg: 10 }} gap="sm" rowHeight={{ base: 80, sm: 90, md: 100 }}>
                  {posts.map((post, i) => {
                    const isCarousel = post.carouselInfo !== undefined;
                    const carouselTotal = post.carouselInfo?.totalImages;
                    
                    return (
                      <BentoGridItem key={post.id} index={i}>
                        <BentoImageCard
                          src={post.media_url}
                          alt={post.caption || 'Photography'}
                          title={post.caption?.slice(0, 50)}
                          subtitle={formatPostDate(post.timestamp)}
                          onClick={() => openLightbox(post)}
                          topRightElement={
                            <div className="flex items-center gap-1">
                              {isCarousel && carouselTotal && carouselTotal > 1 && (
                                <div className="bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z"/>
                                  </svg>
                                  <span>{carouselTotal}</span>
                                </div>
                              )}
                              <a
                                href={post.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="block p-1 text-white/60 hover:text-white transition-colors"
                                aria-label="View on Instagram"
                              >
                                <InstagramIcon className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          }
                        />
                      </BentoGridItem>
                    );
                  })}
                </BentoGrid>
              </div>
            ) : (
              /* Instagram Profile View - use original posts, not expanded */
              <InstagramProfile
                posts={originalPosts}
                username={username}
                fullName="Nasrul Huda"
                bio="Let me tell you a story"
                stats={{
                  posts: originalPosts.length,
                  followers: undefined,
                  following: undefined,
                }}
                onPostClick={openLightbox}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <motion.div variants={fadeInUp} className="text-center py-12">
          <p className="text-tertiary text-sm">No photos yet.</p>
        </motion.div>
      )}

      {/* Lightbox */}
      <Lightbox
        post={selectedPost}
        carouselIndex={selectedCarouselIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={() => navigateLightbox('next')}
        onPrev={() => navigateLightbox('prev')}
      />

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
