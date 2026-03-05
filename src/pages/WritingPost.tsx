import '@assets/styles/prose.css';
import DateViewer from '@components/DateView';
import ExternalLink from '@components/ExternalLink';
import components from '@components/MDXComponents';
import { allWritings } from 'content-collections';
import { lazy, Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const editUrl = (slug: string) =>
  `https://github.com/nnayz/me/edit/main/data/writing/${slug}.mdx`;

// Import all MDX files using Vite's glob import
const mdxModules = import.meta.glob<{ default: React.ComponentType<any> }>(
  '../../data/writing/*.mdx',
);

export default function WritingPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allWritings.find((post) => post.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Get the MDX component loader for this slug
  const mdxPath = `../../data/writing/${slug}.mdx`;
  const mdxLoader = mdxModules[mdxPath];

  // Create a lazy component from the loader, memoized by slug
  const MDXContent = useMemo(() => {
    if (!mdxLoader) {
      return null;
    }
    return lazy(() => mdxLoader().then((mod) => ({ default: mod.default })));
  }, [slug, mdxLoader]);

  if (!mdxLoader || !MDXContent) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="mx-auto max-w-2xl text-secondary">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      ></script>
      <p className="text-tertiary bg-gray-200 dark:bg-gray-800 -ml-1 mb-2 w-fit rounded-md px-1.5 py-0.5 font-mono text-sm">
        <DateViewer date={post.publishedAt} />
      </p>
      <h1 className="text-3xl font-semibold text-primary">{post.title}</h1>
      {post.image && (
        <div className="relative mt-8 h-[400px]">
          <img
            alt={post.title}
            className="h-full w-full rounded-lg object-cover"
            src={post.image}
          />
        </div>
      )}
      <article className="prose-quoteless prose prose-neutral dark:prose-invert">
        <Suspense fallback={<div>Loading...</div>}>
          <MDXContent components={components} />
        </Suspense>
      </article>
      <div className="mt-8">
        <ExternalLink className="text-sm" href={editUrl(post.slug)}>
          Edit source on GitHub
        </ExternalLink>
      </div>
    </div>
  );
}
