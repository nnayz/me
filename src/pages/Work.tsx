/**
 * Work/Highlights Page
 * 
 * Displays projects and professional work in a bento grid layout.
 * Uses the shared BentoGrid component for consistent styling.
 */

import { works } from '@data/work';
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem, BentoImageCard } from '@components/BentoGrid';

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
      className="w-full"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Header - constrained */}
      <motion.div variants={fadeInUp} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 mb-6 sm:mb-8">
        <h1 className="mb-1">Highlights</h1>
        <p className="text-tertiary text-[11px] sm:text-xs max-w-md">
          A collection of projects, experiments, and professional work.
        </p>
      </motion.div>

      {/* Bento Grid - full width breakout, floating moodboard style */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-2 sm:px-4 md:px-16">
        <BentoGrid
          columns={{ sm: 5, md: 7, lg: 10 }}
          gap="sm"
          rowHeight={{ base: 80, sm: 90, md: 100 }}
        >
          {works.map((work, i) => (
            <BentoGridItem key={work.title} index={i}>
              <BentoImageCard
                src={work.img || ''}
                alt={work.title}
                title={work.title}
                subtitle={work.description}
                meta={work.company}
                href={work.href}
              />
            </BentoGridItem>
          ))}
        </BentoGrid>
      </div>
    </motion.div>
  );
}
