import { allWritings } from 'content-collections';
import { cn } from '@/lib/className';
import DateViewer from '@components/DateView';
import ExternalLink from '@components/ExternalLink';
import { Link } from 'react-router-dom';
import logoImage from '/static/images/logo.png';

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

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-16 px-8">
      <Header />
      <Contact />
      <AboutMe />
      <RecentWritings />
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative h-12 w-12">
        <img
          alt="Logo"
          className="rounded-full h-full w-full object-contain"
          src={logoImage}
        />
        <div className="absolute -bottom-2 -right-2 rounded-full bg-white px-1 py-0.5 text-sm dark:bg-gray-900">
          ✨
        </div>
      </div>
      <div className="flex flex-col">
        <h1>Nasrul Huda</h1>
        <p className="text-quaternary">AI Engineer</p>
      </div>
    </div>
  );
}

function AboutMe() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">About me</p>
      <div className="text-secondary flex flex-col gap-4">
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
          <Link className="underline" to={'/work'}>
            highlights and projects
          </Link>{' '}
          if you want to learn more about me.
        </p>
      </div>
    </div>
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
    <span className="block items-center gap-4">
      {website && <p className="text-quaternary">{website}</p>}
      <div className="flex flex-col gap-2">
        {hrefs.map((link, index) => (
          <a
            key={index}
            className="text-secondary hover:text-primary transition-opacity duration-150"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {titles[index] ?? link}{' '}
            <svg
              className="ml-0.5 inline-block h-3 w-3"
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
        <p className="text-secondary hover:text-primary transition-opacity duration-150">
          {typeof title === 'string' ? title : title[0] ?? ''}
        </p>
      )}
    </span>
  );
}

function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">Links</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <ContactLink href="https://read.cv/nasrulhuda" title="drive" website="CV" />
      </div>
    </div>
  );
}

function RecentWritings() {
  try {
    const { posts } = getData();

    if (posts.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-col gap-4">
        <p className="text-tertiary">Recent writing</p>
        <div className="space-y-2">
          {posts.map((post: Post) => (
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
  } catch {
    return null;
  }
}

