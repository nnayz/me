// content-collections.ts
import {
  defineCollection,
  defineConfig
} from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";
var rehypePrettyCodeOptions = {
  onVisitHighlightedLine(node) {
    node.properties.className.push("syntax-line--highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["syntax-word--highlighted"];
  },
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
    node.properties.className.push("syntax-line");
  },
  theme: "poimandres",
  tokensMap: {
    // VScode command palette: Inspect Editor Tokens and Scopes
    // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
    fn: "entity.name.function",
    objKey: "meta.object-literal.key"
  }
};
var computedFields = {
  readingTime: {
    resolve: (doc) => readingTime(doc.body.raw),
    type: "json"
  },
  slug: {
    resolve: (doc) => doc._meta.sourceFileName.replace(/\.mdx$/, ""),
    type: "string"
  },
  structuredData: {
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      author: {
        "@type": "Person",
        name: "Cristian Cre\u021Bu"
      },
      dateModified: doc.publishedAt,
      datePublished: doc.publishedAt,
      description: doc.summary,
      headline: doc.title,
      image: doc.image ? `https://cretu.dev${doc.image}` : `https://cretu.dev/static/images/og.png`,
      url: `https://cretu.dev/writing/${doc._meta.flattenedPath}`
    }),
    type: "json"
  },
  wordCount: {
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
    type: "number"
  }
};
var Writing = defineCollection({
  name: "Writing",
  directory: "data/writing",
  include: "*.mdx",
  computedFields,
  schema: z.object({
    image: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    title: z.string()
  }),
  transform: async (doc) => {
    const { code } = await compileMDX(doc.content, {
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, rehypePrettyCodeOptions],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"]
            }
          }
        ]
      ],
      remarkPlugins: [remarkGfm]
    });
    return {
      ...doc,
      body: {
        raw: doc.content,
        code
      }
    };
  }
});
var config = defineConfig({
  collections: [Writing]
});
var content_collections_default = config;
export {
  content_collections_default as default
};
