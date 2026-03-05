/**
 * InstagramProfile Component
 *
 * A minimal, modern Instagram profile-style layout for displaying photography.
 * Mimics Instagram's profile page but with a clean, portfolio-appropriate aesthetic.
 */
import { cn } from '@/lib/className';
import { InstagramPost } from '@/lib/instagram';
import { motion } from 'framer-motion';

interface InstagramProfileProps {
  posts: InstagramPost[];
  username: string;
  fullName?: string;
  bio?: string;
  stats?: {
    posts?: number;
    followers?: number;
    following?: number;
  };
  onPostClick?: (post: InstagramPost) => void;
}

export default function InstagramProfile({
  posts,
  username,
  fullName,
  bio,
  stats,
  onPostClick,
}: InstagramProfileProps) {
  const handlePostClick = (post: InstagramPost) => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  // Use provided stats.posts (posts are already unique, no expansion in profile view)
  const displayPostCount = stats?.posts ?? posts.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        {/* Profile Info */}
        <div className="space-y-3">
          {/* Username and Name */}
          <div className="space-y-0.5">
            <h1 className="font-[family-name:var(--font-display)] text-base font-semibold sm:text-lg">
              {username}
            </h1>
            {fullName && (
              <p className="text-xs text-secondary sm:text-sm">{fullName}</p>
            )}
          </div>

          {/* Stats */}
          {(displayPostCount !== undefined ||
            stats?.followers !== undefined ||
            stats?.following !== undefined) && (
            <div className="flex gap-4 text-xs sm:gap-6 sm:text-sm">
              {displayPostCount !== undefined && (
                <div>
                  <span className="font-semibold text-primary">
                    {displayPostCount}
                  </span>
                  <span className="text-tertiary ml-1">posts</span>
                </div>
              )}
              {stats?.followers !== undefined && (
                <div>
                  <span className="font-semibold text-primary">
                    {stats.followers}
                  </span>
                  <span className="text-tertiary ml-1">followers</span>
                </div>
              )}
              {stats?.following !== undefined && (
                <div>
                  <span className="font-semibold text-primary">
                    {stats.following}
                  </span>
                  <span className="text-tertiary ml-1">following</span>
                </div>
              )}
            </div>
          )}

          {/* Bio */}
          {bio && (
            <p className="text-xs leading-relaxed text-secondary sm:text-sm">
              {bio}
            </p>
          )}
        </div>
      </motion.div>

      {/* Posts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-3 gap-0.5 sm:gap-1"
      >
        {posts.map((post, i) => {
          // Check if this is a carousel album
          const isCarousel = post.media_type === 'CAROUSEL_ALBUM';
          const carouselTotal =
            post.children?.data?.filter((c) => c.media_type === 'IMAGE')
              .length || 0;

          // Get the first image for carousel posts
          const getImageUrl = () => {
            if (isCarousel && post.children?.data) {
              const firstImage = post.children.data.find(
                (c) => c.media_type === 'IMAGE',
              );
              return firstImage?.media_url || post.media_url;
            }
            return post.media_url;
          };

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="group pointer-events-auto relative aspect-square cursor-pointer"
              onClick={() => handlePostClick(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePostClick(post);
                }
              }}
            >
              {/* Image */}
              <img
                src={getImageUrl()}
                alt={post.caption || 'Photo'}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              {/* Carousel indicator */}
              {isCarousel && carouselTotal > 1 && (
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z" />
                  </svg>
                  <span>{carouselTotal}</span>
                </div>
              )}

              {/* Hover overlay */}
              <div
                className={cn(
                  'absolute inset-0 bg-black/50',
                  'opacity-0 group-hover:opacity-100',
                  'transition-opacity duration-200',
                  'flex items-center justify-center',
                )}
              >
                {/* Like/Comment icons - minimal */}
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-[10px] font-medium sm:text-xs">
                      0
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-[10px] font-medium sm:text-xs">
                      0
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
