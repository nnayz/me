import {
  defineCollection,
  defineConfig,
} from '@content-collections/core';
import readingTime from 'reading-time';
import { z } from 'zod';

const Writing = defineCollection({
  name: 'Writing',
  directory: 'data/writing',
  include: '*.mdx',
  schema: z.object({
    image: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    title: z.string(),
    content: z.string(),
  }),
  transform: async (doc) => {
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
          ? `https://nasrul.info${doc.image}`
          : `https://nasrul.info/static/images/og.png`,
        url: `https://nasrul.info/writing/${doc._meta.path}`,
      },
      body: {
        raw: bodyRaw,
      },
    };
  },
});

const config = defineConfig({
  collections: [Writing],
});

export default config;

