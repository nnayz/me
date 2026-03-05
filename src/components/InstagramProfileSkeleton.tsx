/**
 * InstagramProfileSkeleton Component
 *
 * Skeleton loader for the Instagram profile view.
 * Shows animated placeholders matching the profile layout.
 */

export default function InstagramProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-10">
      {/* Profile Header Skeleton */}
      <div className="mb-6 sm:mb-8">
        {/* Profile Info Skeleton */}
        <div className="space-y-3">
          {/* Username and Name */}
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded bg-black/5 dark:bg-white/5" />
            <div className="h-4 w-24 animate-pulse rounded bg-black/5 dark:bg-white/5" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex gap-6">
            <div className="h-4 w-16 animate-pulse rounded bg-black/5 dark:bg-white/5" />
            <div className="h-4 w-20 animate-pulse rounded bg-black/5 dark:bg-white/5" />
            <div className="h-4 w-20 animate-pulse rounded bg-black/5 dark:bg-white/5" />
          </div>

          {/* Bio Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-black/5 dark:bg-white/5" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-black/5 dark:bg-white/5" />
          </div>
        </div>
      </div>

      {/* Posts Grid Skeleton */}
      <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse bg-black/5 dark:bg-white/5"
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
