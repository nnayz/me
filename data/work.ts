/** Where a project came from. Drives the Filter dropdown on /highlights. */
export type WorkKind = 'employment' | 'freelance' | 'personal' | 'research';

export type WorkCardType = {
  /** Project name as you would say it out loud. Also becomes the /highlights/:slug URL. */
  title: string;
  /** One plain-English line, no jargon. Cards use it; the page opens with it. */
  summary: string;
  /** Employment, freelance, personal, or research. Required — it is the filter. */
  kind: WorkKind;
  /** Real org name: employer, client, or lab. Omit for personal projects. */
  company?: string;
  /** What you actually did, e.g. "Full-stack engineer". */
  role?: string;
  /** 'YYYY-MM'. Drives the Sort dropdown. Undated projects sort last. */
  start?: string;
  /** 'YYYY-MM'. Omit while it is still ongoing. */
  end?: string;
  /** Tailwind height class for the grid card, e.g. "h-72". */
  h?: string;
  /** The write-up. One string per paragraph; Markdown-style links are highlighted inline. */
  body?: string[];
};

export const works: WorkCardType[] = [
  {
    title: 'MLdrills',
    summary:
      'A practice platform where you solve machine-learning problems in the browser and see progress over time.',
    kind: 'personal',
    start: '2026-06',
    h: 'h-96',
    body: [
      'People learning machine learning had LeetCode for algorithms and little else for coding drills, math problems, and interview-style questions with real feedback. Course sites leaned on video; scratch notebooks never tracked what you could actually do.',
      'I built MLdrills as a full practice product: coding, math, and conceptual drills, ordered tracks, interview sets, and larger projects. Learners work in the browser, get graded immediately, and keep a record of submissions, streaks, and solved work. The learner app and project IDE use React, TypeScript, and TanStack Start; a FastAPI API handles Supabase auth and data alongside isolated Python grading on Modal.',
      'The hard split was keeping hidden tests and grading off the client while still feeling instant. Submissions go through the API into sandboxed runs; the browser only polls results. That cost extra orchestration and a second deploy surface, but it meant I could ship real graders without leaking solutions.',
      'I later pulled the in-browser editor and Python trace tooling into separate packages so the IDE could stay lean. [Try MLdrills](https://mldrills.com); it is still under active development.',
    ],
  },
  {
    title: 'SynTwin',
    summary: 'The platform and AI agents that bring digital twins to life.',
    kind: 'employment',
    company: 'SynTwin GmbH',
    role: 'AI Engineer',
    start: '2025-10',
    end: '2026-04',
    h: 'h-96',
    body: [
      'SynTwin needed conversational agents that could drive digital-twin workflows without collapsing under multi-turn, stateful dialogue. Reliability mattered more than a clever demo.',
      'I built agentic workflows and orchestration in Python with LiveKit, tuned prompts for consistency across long sessions, and shipped a React/Vite UI wired to Supabase for auth and real-time sync. Docker kept the backend services portable as the work moved between agent design, infrastructure, and the surfaces users actually touched.',
      'The interesting constraint was keeping agents stable when context grew and tools failed mid-turn. Explicit orchestration and careful prompt structure cost more upfront design than a single chat loop, but they made handoffs and recovery predictable.',
      'I worked part-time with the CTO and a small team of five through April 2026 on end-to-end system design for the platform. [Visit SynTwin](https://syntwin.ai) to learn more about the product.',
    ],
  },
  {
    title: 'Federated Nicheformer',
    summary:
      'Training a genomics model across many datasets without ever moving the data.',
    kind: 'research',
    company: 'University of Hamburg',
    role: 'Research project',
    start: '2025-12',
    end: '2026-02',
    h: 'h-48',
    body: [
      'Spatial transcriptomics labs often cannot pool raw single-cell data, yet they still want foundation models fine-tuned on what each site holds. Central training was accurate but not always allowed.',
      'Using Python and PyTorch, I fine-tuned Nicheformer for 24-class cell-type classification on mouse brain spatial data and compared centralized, federated, and purely local training. Clients were split by anatomy (dorsal, mid, ventral) so the federated setting was deliberately non-IID, with one replicate held out for evaluation.',
      'Federated training closed most of the gap to a full central run without sharing samples: centralized reached 94.45% accuracy, federated 92.76%, and local clients averaged far lower. The tradeoff was heavier training logistics and a drop in macro-F1 versus the central baseline.',
      'The [code and write-ups live on GitHub](https://github.com/nnayz/ft-nicheformer) for anyone repeating the comparison.',
    ],
  },
  {
    title: 'ACL Anthology Search',
    summary:
      'Find research papers by what they mean, not the keywords they happen to use.',
    kind: 'research',
    role: 'Research project',
    start: '2025-12',
    end: '2026-02',
    h: 'h-72',
    body: [
      'The ACL Anthology is huge, and keyword search misses papers that say the same idea in different words. Researchers hunting related work needed something closer to meaning than exact phrases.',
      'I built a semantic search system over anthology abstracts: offline embedding and indexing into Qdrant, then online retrieval with LLM query reformulation and reciprocal rank fusion. You can ask in plain language or paste a paper ID and treat its abstract as the query. A FastAPI backend and React UI use LangChain to coordinate retrieval and stream answers with inline citations.',
      'Splitting Fireworks for embeddings from Groq for reformulation kept costs and latency manageable, at the price of two providers and a clear offline/online boundary. RRF over multiple reformulations improved recall without a heavy re-ranker.',
      'The project is open source. You can [try the live demo](https://acla.nasrul.info) or [explore the full pipeline on GitHub](https://github.com/nnayz/acl-anthology-rag).',
    ],
  },
  {
    title: 'Bioacoustic Sound Classification',
    summary:
      'Teaching a model to recognise animal calls from only a handful of examples.',
    kind: 'research',
    company: 'University of Hamburg',
    role: 'Course project',
    start: '2025-10',
    end: '2026-01',
    h: 'h-48',
    body: [
      'New species and call types show up with almost no labels. Standard classifiers need large sets per class; field work rarely provides that.',
      'For a DCASE-style few-shot setup I trained PyTorch Prototypical Networks on episodic N-way K-shot tasks over animal vocalizations. Torchaudio turned each clip into log-mel and PCEN features once, then training used the saved arrays. I compared several encoders, from a ResNet baseline through attention and transformer variants to a pretrained EfficientNet path, with PyTorch Lightning, Hydra, and MLflow around the runs.',
      'Precomputing features slowed the first pass but made episodic training fast enough to iterate on architecture and distance metrics. The meta-learning framing bought adaptation from a handful of clips at the cost of a more complex data pipeline than a flat classifier.',
      'Training and evaluation commands are packaged in a small CLI in the [public repository](https://github.com/nnayz/prototypical-networks-bioacoustics).',
    ],
  },
  {
    title: 'Pettoo',
    summary:
      'A care platform that connects pet owners with the services they need.',
    kind: 'freelance',
    company: 'Pettoo UG',
    role: 'Software engineer',
    start: '2025-06',
    end: '2025-09',
    h: 'h-72',
    body: [
      'Pettoo needed a backend that could list services, take bookings, sell products, and connect pet owners without turning into an unmaintainable pile of endpoints.',
      'I designed the schema and core business logic on FastAPI and PostgreSQL, added Elasticsearch for search, and set up CI/CD and container deploys on GCP. I also coordinated a team of three so API shape and quality stayed consistent.',
      'Search and booking shared one data model carefully enough that product and services did not fork into separate worlds. Elasticsearch added ops surface area, but owner-facing discovery needed it more than SQL ILIKE could give.',
      'You can [visit Pettoo](https://pettoo.de) to see the public site; the engagement ran through September 2025.',
    ],
  },
  {
    title: 'Discourse Analysis Tool Suite',
    summary:
      'Tools that help researchers explore and make sense of large text collections.',
    kind: 'employment',
    company: 'Language Technology Lab, University of Hamburg',
    role: 'Research Assistant',
    start: '2025-02',
    end: '2025-05',
    h: 'h-72',
    body: [
      'Discourse researchers at Hamburg needed software that could run serious text analysis without every step living in a one-off notebook.',
      'On the DATS project I shipped full-stack pieces: React and TypeScript on the front, FastAPI services and REST APIs behind them, plus NLP preprocessing and analysis paths for large linguistic collections.',
      'Fitting research algorithms into a shared platform meant stable APIs and Dockerised services instead of scripts only the author could run. That slowed some experiments and made collaboration and demos much easier.',
      'The [suite is available on the university demo host](https://dats.ltdemos.informatik.uni-hamburg.de) for the Language Technology group.',
    ],
  },
  {
    title: 'MyTorch',
    summary:
      'A tiny deep-learning framework built from scratch to see how PyTorch really works.',
    kind: 'personal',
    start: '2025-03',
    end: '2025-07',
    h: 'h-96',
    body: [
      'I was tired of treating autograd as a black box. Reading about backprop is easy; trusting that you understand it is harder.',
      'MyTorch is a small Python library built only on NumPy, with tensors, reverse-mode differentiation, linear layers, ReLU, cross-entropy, and SGD and Adam written by hand. The API deliberately echoes PyTorch so the mental model transfers.',
      'Staying on dense linear layers kept the scope honest: no conv kernels, no CUDA. The payoff was a full train loop I could step through line by line. On MNIST the framework reached 97.16% test accuracy, which was enough to trust the gradients.',
      'The [MyTorch repository](https://github.com/nnayz/mytorch) stays up as a teaching reference rather than a package meant for production training.',
    ],
  },
];

export const kindLabels: Record<WorkKind, string> = {
  employment: 'Employment',
  freelance: 'Freelance',
  personal: 'Personal',
  research: 'Research',
};

/** "SynTwin GmbH · Full-stack engineer · 2024 — Present" */
export const workMeta = (work: WorkCardType): string =>
  [work.company, work.role, workPeriod(work)].filter(Boolean).join(' · ');

export const workPeriod = (work: WorkCardType): string => {
  if (!work.start) return '';
  const year = (date: string) => date.slice(0, 4);
  const end = work.end ? year(work.end) : 'Present';
  return year(work.start) === end ? end : `${year(work.start)} — ${end}`;
};

// ponytail: slug derived from the title — no second source of truth to keep in sync.
export const workSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const findWork = (slug: string): WorkCardType | undefined =>
  works.find((work) => workSlug(work.title) === slug);
