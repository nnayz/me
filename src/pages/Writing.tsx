import { allWritings } from 'content-collections';
import { cn } from '@/lib/className';
import DateViewer from '@components/DateView';
import { Link } from 'react-router-dom';

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

function EmptyState() {
  return (
    <div className="text-tertiary flex flex-col items-center justify-center py-16 text-center">
      <svg
        className="mb-4 h-12 w-12 opacity-50"
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
      <p className="text-secondary mb-2 text-lg">No posts yet</p>
      <p className="text-tertiary max-w-md">
        Writing is coming soon. Check back later for thoughts, ideas, and
        updates.
      </p>
    </div>
  );
}

export default function Writing() {
  const { posts } = getData();
  return (
    <div className="mx-auto max-w-2xl space-y-16">
      <h1>Writing</h1>
      <p className="text-tertiary">
        If you&apos;re interested in exploring the articles that inspire me and
        shape my thinking, check out{' '}
        <Link className="underline " to={'/resources'}>
          Resources
        </Link>
        .
      </p>
      {posts.length > 0 ? (
        <div className="space-y-2">
          {posts.map((post) => (
            <Link
              className={cn(
                '-mx-2 flex flex-row justify-between rounded-md px-2 py-2',
                'hover:bg-gray-200 dark:hover:bg-gray-800',
                'transition-all duration-200',
              )}
              to={`/writing/${post.slug}`}
              key={post.slug}
            >
              <span className="text-secondary mr-2 flex-grow truncate">
                {post.title}
              </span>
              <span className="text-tertiary flex-shrink-0">
                <DateViewer date={post.publishedAt} />{' '}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

