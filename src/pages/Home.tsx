import { allWritings } from 'content-collections';
import { cn } from '@/lib/className';
import DateViewer from '@components/DateView';
import ExternalLink from '@components/ExternalLink';
import { Link } from 'react-router-dom';
import logoImage from '/static/images/logo.png';

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
    )
    .slice(0, 3);

  return { posts };
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
          I&apos;m obsessed with creating digital interfaces that just{' '}
          <i>work</i> - where design and code come together seamlessly.
          You&apos;ll often find me tinkering with prototypes or exploring apps
          that have that special charm.
        </p>
        <p>
          Playing with prototypes, exploring charmful apps, now at{' '}
          <ExternalLink arrow={false} href="https://deta.space">
            Deta
          </ExternalLink>{' '}
          reimagining what an operating system can be for the web. Formerly at{' '}
          <ExternalLink arrow={false} href="https://github.com/Landmarks-Tech">
            Landmarks
          </ExternalLink>{' '}
          , crafting web applications that aimed to be both beautiful and
          functional.
        </p>
        <p>
          Currently studying Computer Science at BBU. I&apos;m a firm believer
          in always learning, whether it&apos;s through reading, writing, or
          diving into new projects.
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
  href?: string;
  title: string;
  website?: string;
}) {
  return (
    <span className="block items-center gap-4">
      {website && <p className="text-quaternary">{website}</p>}
      {href && (
        <a
          className="text-secondary hover:text-primary transition-opacity duration-150"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {title}{' '}
          <svg
            className=" inline-block h-3 w-3"
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
      )}
      {email && (
        <p className="text-secondary hover:text-primary transition-opacity duration-150">
          {title}
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
          href="https://X.com/nasrulhuda"
          title="nasrulhuda"
          website="X"
        />
        <ContactLink
          href="https://github.com/nnayz"
          title="nnayz"
          website="GitHub"
        />
        <ContactLink
          href="https://www.figma.com/@nasrulhuda"
          title="nasrulhuda"
          website="Figma"
        />
        <ContactLink
          href="https://layers.to/nasrulhuda"
          title="nasrulhuda"
          website="Layers.to"
        />
        <ContactLink
          email="hi[at]nasrulhuda(dot)dev"
          title="hi[at]nasrulhuda(dot)dev"
          website="Email"
        />
        <ContactLink href="https://read.cv/nasrulhuda" title="nasrulhuda" website="CV" />
      </div>
    </div>
  );
}

function RecentWritings() {
  const { posts } = getData();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-tertiary">Recent writing</p>
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

