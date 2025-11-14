import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import contentCollectionsPlugin from '@content-collections/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm] as any,
      rehypePlugins: [
        rehypeSlug as any,
        [
          rehypeAutolinkHeadings as any,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
    }),
    contentCollectionsPlugin({
      configPath: './metadata.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@data': path.resolve(__dirname, './data'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
      'content-collections': path.resolve(__dirname, './.content-collections/generated'),
    },
  },
  build: {
    outDir: 'dist',
  },
});

