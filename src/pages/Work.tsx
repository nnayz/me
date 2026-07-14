/**
 * Work / Highlights — a plain grid of the things I have shipped. Live sites get
 * a framed Safari preview; repos get a simple text card. Monochrome chrome on
 * purpose: the sites themselves are the colour.
 */
import { Safari } from '@/components/ui/safari';
import { cn } from '@/lib/className';
import { EASE_EXPO } from '@/lib/motion';
import { works, type WorkCardType } from '@data/work';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Work() {
  const reduce = !!useReducedMotion();

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-6xl px-5 sm:px-8"
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
    >
      <header className="mb-10 border-b border-black/10 pb-6 dark:border-white/10">
        <h1 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
          Highlights
        </h1>
        <p className="text-tertiary mt-2 max-w-md text-sm">
          A handful of things I have built — at work, at university, and for the
          fun of it.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        {works.map((work, index) => (
          <ProjectCard featured={index === 0} key={work.title} work={work} />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectCard({
  featured,
  work,
}: {
  featured?: boolean;
  work: WorkCardType;
}) {
  const previewUrl = getPreviewUrl(work);
  const meta = [work.company, previewUrl && formatDisplayUrl(previewUrl)]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className={cn('group flex flex-col', featured && 'md:col-span-2')}>
      <div
        className={cn(
          'relative overflow-hidden rounded-lg border border-black/10 bg-white',
          'transition-transform duration-500 ease-out group-hover:-translate-y-1',
          'dark:border-white/10 dark:bg-neutral-950',
        )}
      >
        {previewUrl ? (
          <Safari
            className="block h-auto w-full"
            iframeSrc={previewUrl}
            iframeTitle={`${work.title} preview`}
            mode="default"
            url={formatDisplayUrl(previewUrl)}
          />
        ) : (
          <RepositoryPreview work={work} />
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-primary text-lg font-semibold tracking-tight">
            {work.title}
          </h2>
          <p className="text-secondary mt-1.5 max-w-md text-sm leading-relaxed">
            {work.summary}
          </p>
          {meta && (
            <p className="text-quaternary mt-3 font-mono text-[11px] tracking-wide">
              {meta}
            </p>
          )}
        </div>

        {work.href && work.href.length > 0 && (
          <div className="flex shrink-0 gap-1">
            {work.href.map((href) => (
              <ProjectLink href={href} key={href} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function RepositoryPreview({ work }: { work: WorkCardType }) {
  return (
    <div className="flex aspect-[1203/753] flex-col justify-between p-8">
      <span className="text-quaternary font-mono text-[11px] tracking-wide">
        {work.url ?? getLinkLabel(work.href?.[0] ?? '')}
      </span>
      <p className="text-tertiary max-w-md font-mono text-sm leading-relaxed">
        {work.summary}
      </p>
    </div>
  );
}

function ProjectLink({ href }: { href: string }) {
  return (
    <a
      aria-label={getLinkLabel(href)}
      className={cn(
        'text-tertiary hover:text-primary inline-flex h-8 w-8 items-center justify-center',
        'rounded-md border border-transparent transition-colors',
        'hover:border-black/10 dark:hover:border-white/10',
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px" />
    </a>
  );
}

/* ── helpers ──────────────────────────────────────────────────────── */

function getPreviewUrl(work: WorkCardType) {
  const href = work.href?.find((link) => !link.includes('github.com'));
  const candidate = href ?? work.url;
  if (!candidate || candidate.includes('github.com')) return null;
  return normalizeUrl(candidate);
}

function normalizeUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function formatDisplayUrl(url: string) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname === '/' ? '' : parsed.pathname}`;
  } catch {
    return url;
  }
}

function getLinkLabel(href: string) {
  try {
    const { hostname } = new URL(href);
    return hostname.replace(/^www\./, '').replace(/^github\.com$/, 'GitHub');
  } catch {
    return 'Open';
  }
}
