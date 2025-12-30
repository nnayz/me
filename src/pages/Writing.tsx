import { allWritings } from 'content-collections';
import { cn } from '@/lib/className';
import DateViewer from '@components/DateView';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Post = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
};

function getData(): { posts: Post[] } {
  try {
    const posts = ((allWritings as any[]) || [])
      .map((post: any): Post => ({
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        publishedAt: post.publishedAt,
      }))
      .sort(
        (a: Post, b: Post) =>
          Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
      );

    return { posts };
  } catch {
    return { posts: [] };
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function EmptyState() {
  return (
    <motion.div 
      variants={fadeInUp}
      className="text-tertiary flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="mb-3 h-10 w-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
        <svg
          className="h-5 w-5 opacity-50"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-secondary mb-1 text-sm font-medium">No posts yet</p>
      <p className="text-tertiary max-w-xs text-xs">
        Writing is coming soon. Check back later for thoughts, ideas, and updates.
      </p>
    </motion.div>
  );
}

export default function Writing() {
  const { posts } = getData();
  return (
    <motion.div 
      className="mx-auto max-w-xl px-6 space-y-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeInUp} className="space-y-2">
        <h1>Writing</h1>
        <p className="text-tertiary text-sm">
          If you&apos;re interested in exploring the articles that inspire me and
          shape my thinking, check out{' '}
          <Link className="underline decoration-black/30 dark:decoration-white/30 underline-offset-2 hover:decoration-black dark:hover:decoration-white transition-colors" to={'/resources'}>
            Resources
          </Link>
          .
        </p>
      </motion.div>
      {posts.length > 0 ? (
        <motion.div variants={fadeInUp} className="space-y-0.5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            >
              <Link
                className={cn(
                  '-mx-2 flex flex-row justify-between items-center px-2 py-1.5',
                  'hover:bg-black/5 dark:hover:bg-white/5',
                  'transition-all duration-150 rounded',
                  'group',
                )}
                to={`/writing/${post.slug}`}
              >
                <span className="text-secondary mr-2 flex-grow truncate group-hover:text-primary transition-colors text-sm">
                  {post.title}
                </span>
                <span className="text-quaternary flex-shrink-0 text-xs tabular-nums">
                  <DateViewer date={post.publishedAt} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </motion.div>
  );
}
