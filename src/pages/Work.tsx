/**
 * Work/Highlights Page
 *
 * Displays projects and professional work in an expanded blog-like layout.
 */

import { works, WorkCardType } from '@data/work';
import { motion } from 'framer-motion';
import { cn } from '@/lib/className';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Work() {
  return (
    <motion.div
      className="mx-auto flex max-w-2xl flex-col gap-16 px-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-1">
        <h1>Highlights</h1>
        <p className="text-tertiary text-sm">
          Projects and professional work.
        </p>
      </motion.div>

      {/* Work items */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-20">
        {works.map((work, index) => (
          <WorkCard key={work.title} work={work} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function WorkCard({ work, index }: { work: WorkCardType; index: number }) {
  return (
    <motion.article
      className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image */}
      {work.img && (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
          <img
            src={work.img}
            alt={work.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Title and meta */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{work.title}</h2>
          <div className="flex items-center gap-2 text-tertiary text-xs">
            {work.role && <span>{work.role}</span>}
            {work.role && work.company && <span>·</span>}
            {work.company && <span>{work.company}</span>}
          </div>
        </div>

        {/* Description */}
        {work.content && (
          <p className="text-secondary text-sm leading-relaxed">{work.content}</p>
        )}

        {/* Tags */}
        {work.tags && work.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'px-2 py-0.5 text-[10px]',
                  'border border-black/10 dark:border-white/10',
                  'text-tertiary',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        <div className="flex flex-wrap gap-1.5 mt-1">
        {work.href && work.href.length > 0 && 
          work.href.map((href, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 mt-1',
              'text-sm text-secondary hover:text-primary',
              'transition-colors duration-200 w-fit',
            )}
          >
            {href.startsWith('https://github.com') ? <FaGithub /> : <FaExternalLinkAlt />}
          </a>
        ))}
        </div>
      </div>
    </motion.article>
  );
}

