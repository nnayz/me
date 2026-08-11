import Playground from '../pages/Playground';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/playground')({
  component: Playground,
  head: () => ({
    meta: [
      { title: 'Playground · Nasrul Huda' },
      {
        content: 'A playful spatial music sequencer by Nasrul Huda.',
        name: 'description',
      },
    ],
  }),
});
