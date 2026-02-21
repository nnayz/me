export type WorkCardType = {
  title: string;
  authors?: string[];
  href?: string[];
  company?: string;
  img?: string;
  h?: string;
  content?: string; // Detailed description for modal
  tags?: string[]; // Tech stack or keywords
  role?: string; // Your role in the project
};

export const works: WorkCardType[] = [
  {
    title: "SynTwin AI",
    img: "/static/images/work/syntwin.webp",
    href: [ "https://syntwin.ai" ],
    company: "SynTwin GmbH",
    h: "h-96",
    role: "AI Engineer",
    content: "Working on a platform that brings Digital Twins to life, developing agentic workflows that push the boundaries of interaction. Building AI-powered systems that enable intelligent automation and decision-making in digital twin environments.",
    tags: ["AI", "Digital Twins", "Agentic Workflows", "Python", "Machine Learning"],
  },
  {
    title: "Federated fine-tuning of nicheformer on spatial transcriptomics data",
    href: [ "https://github.com/nnayz/ft-nicheformer" ],
    company: "Personal Project",
    h: "h-48",
    content: "Developed a federated learning framework for fine-tuning Nicheformers, enabling distributed model training across spatial transcriptomics data without centralizing sensitive datasets. Implemented zero-shot application techniques to apply pre-trained models to novel biological domains, advancing privacy-preserving approaches in computational biology and genomics research.",
    tags: [ "Python", "Machine Learning", "Federated Learning", "Nicheformer", "Bioinformatics" ]
  },
  {
    title: "ACL Anthology RAG",
    href: [ "https://github.com/nnayz/acl-anthology-rag", "https://acla.nasrul.info" ],
    company: "Personal Project",
    h: "h-48",
    content: "Built a retrieval-augmented generation (RAG) system for the ACL Anthology that leverages semantic dense vector embeddings to provide intelligent research paper recommendations. Implemented a full-stack solution combining Python FastAPI backend services with a TypeScript frontend, enabling researchers to discover relevant papers through similarity-based semantic search rather than traditional keyword matching.",
    tags: [ "Python", "Machine Learning", "ACL Anthology", "RAG", "FastAPI", "TypeScript", "Semantic Search" ]
  },
  {
    title: "MyTorch",
    href: [ "https://github.com/nnayz/mytorch" ],
    h: "h-96",
    role: "Personal Project",
    content: "A personal deep learning framework built from scratch to understand the fundamentals of neural networks and automatic differentiation. Educational project exploring the inner workings of frameworks like PyTorch.",
    tags: ["Deep Learning", "Python", "Neural Networks", "Education"],
  },
  {
    title: "Pettoo",
    img: "/static/images/work/pettoo.webp",
    href: [ "https://pettoo.de" ],
    company: "Pettoo UG",
    h: "h-72",
    role: "Full Stack Developer",
    content: "Developed a comprehensive pet care platform connecting pet owners with veterinary services and pet care solutions. Built scalable web applications with modern technologies.",
    tags: ["React", "TypeScript", "Node.js", "Full Stack"],
  },
  {
    title: "Discourse Analysis Tool Suite",
    img: "/static/images/work/dats.webp",
    href: [ "https://dats.ltdemos.informatik.uni-hamburg.de" ],
    company: "University of Hamburg",
    h: "h-72",
    role: "Research Developer",
    content: "Data Analytics and Transformation System - a research project focused on developing tools and methodologies for data analysis and transformation in academic research contexts.",
    tags: ["Data Science", "Research", "Analytics", "Python"],
  }
];
