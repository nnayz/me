import { allWritings } from 'content-collections';
import { cn } from '@/lib/className';
import DateViewer from '@components/DateView';
import ExternalLink from '@components/ExternalLink';
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
      )
      .slice(0, 3);

    return { posts };
  } catch {
    return { posts: [] };
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Home() {
  return (
    <motion.div 
      className="mx-auto flex max-w-xl flex-col gap-10 px-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <Header />
      <Contact />
      <AboutMe />
      <RecentWritings />
    </motion.div>
  );
}

function Header() {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-0.5">
      <h1>Nasrul Huda</h1>
      <p className="text-tertiary text-xs font-medium tracking-wide">AI Engineer</p>
    </motion.div>
  );
}

function AboutMe() {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-3">
      <p className="text-tertiary text-xs font-medium uppercase tracking-wider">About me</p>
      <div className="text-secondary flex flex-col gap-3 text-sm">
        <p>
          I enjoy building software that feels natural and dependable, where
          thoughtful engineering meets clean, purposeful design. I like
          exploring new tools, experimenting with prototypes, and understanding
          how AI and data can shape more intuitive digital experiences.
        </p>
        <p>
          I am currently an AI Engineer at{' '}
          <ExternalLink arrow={false} href="https://syntwin.ai">
            SynTwin GmbH
          </ExternalLink>
          , working on the platform that brings Digital Twins to life and
          developing agentic workflows that push the boundaries of interaction.
          My path has taken me through research groups, startups, and full stack
          projects across data, AI, and web engineering.
        </p>
        <p>
          I study Data Science and AI at the{' '}
          <ExternalLink arrow={false} href="https://www.uni-hamburg.de">
            University of Hamburg
          </ExternalLink> and keep learning by reading,
          making, and exploring new ideas.
        </p>
        <p>
          Check out my{' '}
          <Link className="underline decoration-black/30 dark:decoration-white/30 underline-offset-2 hover:decoration-black dark:hover:decoration-white transition-colors" to={'/work'}>
            highlights and projects
          </Link>{' '}
          if you want to learn more about me.
        </p>
      </div>
    </motion.div>
  );
}

function ContactLink({
  href,
  title,
  website,
  email,
}: {
  email?: string;
  href?: string | string[];
  title: string | string[];
  website?: string | string[];
}) {
  const hrefs = Array.isArray(href) ? href : href ? [href] : [];
  const titles = Array.isArray(title) ? title : title ? [title] : [];

  return (
    <span className="block items-center group">
      {website && <p className="text-tertiary text-[10px] font-medium uppercase tracking-wider mb-0.5">{website}</p>}
      <div className="flex flex-col gap-1">
        {hrefs.map((link, index) => (
          <a
            key={index}
            className="text-secondary hover:text-primary transition-colors duration-150 flex items-center gap-1 text-sm"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{titles[index] ?? link}</span>
            <svg
              className="h-2.5 w-2.5 opacity-40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
      {email && (
        <p className="text-secondary hover:text-primary transition-colors duration-150 text-sm">
          {typeof title === 'string' ? title : title[0] ?? ''}
        </p>
      )}
    </span>
  );
}

function Contact() {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-3">
      <p className="text-tertiary text-xs font-medium uppercase tracking-wider">Links</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3">
        <ContactLink
          href="https://www.linkedin.com/in/nasrul-hudaa/"
          title="Nasrul Huda"
          website="LinkedIn"
        />
        <ContactLink
          href="https://github.com/nnayz"
          title="@nnayz"
          website="GitHub"
        />
        <ContactLink
          href={["https://www.instagram.com/nnasrrul/", "https://www.instagram.com/nasrultakesphotos/"]}
          title={["@nnasrrul", "@nasrultakesphotos"]}
          website="Instagram"
        />
        <ContactLink
          href="https://x.com/nnasrrull"
          title="@nnasrrull"
          website="X"
        />
        <ContactLink
          email="hi@nasrul.info"
          title="hi@nasrul.info"
          website="Email"
        />
        <ContactLink href="https://www.icloud.com/iclouddrive/019RBdIabpIVIYYd0D1u4Z_ug#resume" title="drive" website="CV" />
      </div>
    </motion.div>
  );
}

function RecentWritings() {
  try {
    const { posts } = getData();

    if (posts.length === 0) {
      return null;
    }

    return (
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p className="text-tertiary text-xs font-medium uppercase tracking-wider">Recent writing</p>
        <div className="space-y-0.5">
          {posts.map((post: Post) => (
            <Link
              className={cn(
                '-mx-2 flex flex-row justify-between items-center px-2 py-1.5',
                'hover:bg-black/5 dark:hover:bg-white/5',
                'transition-all duration-150 rounded',
                'group',
              )}
              to={`/writing/${post.slug}`}
              key={post.slug}
            >
              <span className="text-secondary mr-2 flex-grow truncate group-hover:text-primary transition-colors text-sm">
                {post.title}
              </span>
              <span className="text-quaternary flex-shrink-0 text-xs tabular-nums">
                <DateViewer date={post.publishedAt} />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    );
  } catch {
    return null;
  }
}
