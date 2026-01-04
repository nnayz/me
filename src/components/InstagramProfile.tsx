/**
 * InstagramProfile Component
 * 
 * A minimal, modern Instagram profile-style layout for displaying photography.
 * Mimics Instagram's profile page but with a clean, portfolio-appropriate aesthetic.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/className';
import { InstagramPost } from '@/lib/instagram';

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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-12"
      >
        {/* Profile Info */}
        <div className="space-y-4">
          {/* Username and Name */}
          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-semibold font-[family-name:var(--font-display)]">
              {username}
            </h1>
            {fullName && (
              <p className="text-sm text-secondary">{fullName}</p>
            )}
          </div>

          {/* Stats */}
          {stats && (
            <div className="flex gap-6 text-sm">
              {stats.posts !== undefined && (
                <div>
                  <span className="font-semibold text-primary">{stats.posts}</span>
                  <span className="text-tertiary ml-1">posts</span>
                </div>
              )}
              {stats.followers !== undefined && (
                <div>
                  <span className="font-semibold text-primary">{stats.followers}</span>
                  <span className="text-tertiary ml-1">followers</span>
                </div>
              )}
              {stats.following !== undefined && (
                <div>
                  <span className="font-semibold text-primary">{stats.following}</span>
                  <span className="text-tertiary ml-1">following</span>
                </div>
              )}
            </div>
          )}

          {/* Bio */}
          {bio && (
            <p className="text-sm text-secondary leading-relaxed">{bio}</p>
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
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className="aspect-square relative group cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            {/* Image */}
            <img
              src={post.media_url}
              alt={post.caption || 'Photo'}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <div className={cn(
              'absolute inset-0 bg-black/40',
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-200',
              'flex items-center justify-center',
            )}>
              {/* Like/Comment icons - minimal */}
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-xs font-medium">0</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xs font-medium">0</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}

