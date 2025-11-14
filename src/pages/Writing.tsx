import { allWritings } from 'content-collections';
import { cn } from '@/lib/className';
import DateViewer from '@components/DateView';
import { Link } from 'react-router-dom';

function getData() {
  const posts = allWritings
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      publishedAt: post.publishedAt,
    }))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    );

  return { posts };
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
    </div>
  );
}

