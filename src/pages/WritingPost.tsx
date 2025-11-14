import '@assets/styles/prose.css';
import { allWritings } from 'content-collections';
import DateViewer from '@components/DateView';
import ExternalLink from '@components/ExternalLink';
import { Mdx } from '@components/MDXComponents';
import { useParams, Navigate } from 'react-router-dom';

const editUrl = (slug: string) =>
  `https://github.com/nnayz/cretu.dev/edit/main/data/writing/${slug}.mdx`;

export default function WritingPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allWritings.find((post) => post.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="text-secondary mx-auto max-w-2xl">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      ></script>
      <p className="text-tertiary mb-2 font-mono text-sm bg-gray-200 dark:bg-gray-800 w-fit px-1.5 py-0.5 rounded-md -ml-1">
        <DateViewer date={post.publishedAt} />
      </p>
      <h1 className="text-primary text-3xl font-semibold">{post.title}</h1>
      {post.image && (
        <div className="relative mt-8 h-[400px]">
          <img
            alt={post.title}
            className="rounded-lg h-full w-full object-cover"
            src={post.image}
          />
        </div>
      )}
      <Mdx code={post.body.code} />
      <div className="mt-8">
        <ExternalLink className="text-sm" href={editUrl(post.slug)}>
          Edit source on GitHub
        </ExternalLink>
      </div>
    </div>
  );
}

