import { works } from '@data/work';
import { cn } from '@/lib/className';
import { motion } from 'framer-motion';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
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
      className="flex flex-col space-y-8 px-6 max-w-4xl mx-auto"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeInUp} className="flex flex-col space-y-4">
        <h1>Highlights</h1>
        <p className="text-tertiary max-w-2xl">
          Here&apos;s a list of some of the things I&apos;ve worked on,
          including personal projects, open source contributions, and
          professional work.
        </p>
      </motion.div>
      <motion.div 
        variants={fadeInUp}
        className="columns-1 gap-3 sm:columns-2 md:columns-3 [&>div:not(:first-child)]:mt-3"
      >
        {works.map((work, i) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <Card
              authors={work.authors}
              company={work.company}
              description={work.description}
              h={work.h}
              img={work.img}
              title={work.title}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function Card({
  description = '2021',
  title = 'Deta',
  img,
  authors,
  h = 'h-48',
  company,
}: {
  authors?: string[];
  company?: string;
  description?: string;
  h?: string;
  img?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        'group relative flex break-inside-avoid flex-col space-y-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-2 text-neutral-200 overflow-hidden',
        'border border-black/5 dark:border-white/5',
        'transition-all duration-300 hover:border-black/10 dark:hover:border-white/10',
      )}
    >
      <div className={cn('relative rounded-lg', h, 'overflow-hidden')}>
        <img
          alt={title}
          className="absolute h-full w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
          src={img}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
        <div className="flex flex-row justify-between items-end">
          <span className="font-medium text-white text-sm">{title}</span>
          <span className="font-mono text-xs text-white/70">{description}</span>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex select-none flex-col items-center justify-center p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-sm rounded-xl">
        <div className="flex select-none flex-col text-center">
          <span className="font-bold text-white text-lg">{title}</span>
          <span className="text-white/80 text-sm">{description}</span>
          {company && <span className="text-white/60 text-xs mt-1">{company}</span>}

          {authors && authors.length > 0 && (
            <div className="mt-4 select-none space-y-0.5">
              {authors.map((author) => (
                <span className="block text-white/60 text-xs" key={author}>
                  {author}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
