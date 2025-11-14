import {
  defineCollection,
  defineConfig,
} from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const rehypePrettyCodeOptions: Partial<Options> = {
  onVisitHighlightedLine(node) {
    node.properties.className.push('syntax-line--highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['syntax-word--highlighted'];
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
    node.properties.className.push('syntax-line');
  },
  theme: 'poimandres',
  tokensMap: {
    // VScode command palette: Inspect Editor Tokens and Scopes
    // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
    fn: 'entity.name.function',
    objKey: 'meta.object-literal.key',
  },
};

const Writing = defineCollection({
  name: 'Writing',
  directory: 'data/writing',
  include: '*.mdx',
  schema: z.object({
    image: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    title: z.string(),
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(
      { cache: context.cache },
      {
        _meta: doc._meta,
        content: doc.content,
      },
      {
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ] as any,
        remarkPlugins: [remarkGfm] as any,
      },
    );
    
    const slug = doc._meta.fileName.replace(/\.mdx$/, '');
    const bodyRaw = doc.content;
    
    const readingTimeResult = readingTime(bodyRaw);
    
    return {
      ...doc,
      slug,
      readingTime: {
        text: readingTimeResult.text,
        minutes: readingTimeResult.minutes,
        time: readingTimeResult.time,
        words: readingTimeResult.words,
      },
      wordCount: bodyRaw.split(/\s+/g).length,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        author: {
          '@type': 'Person',
          name: 'Nasrul Huda',
        },
        dateModified: doc.publishedAt,
        datePublished: doc.publishedAt,
        description: doc.summary,
        headline: doc.title,
        image: doc.image
          ? `https://nasrulhuda.dev${doc.image}`
          : `https://nasrulhuda.dev/static/images/og.png`,
        url: `https://nasrulhuda.dev/writing/${doc._meta.path}`,
      },
      body: {
        raw: bodyRaw,
        code,
      },
    };
  },
});

const config = defineConfig({
  collections: [Writing],
});

export default config;

