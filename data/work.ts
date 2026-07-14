export type WorkCardType = {
  title: string;
  summary: string; // One plain-English line. No jargon.
  href?: string[];
  company?: string; // Real org name only — never a category label.
  img?: string;
  url?: string; // Domain shown in the Safari address bar
  h?: string;
};

export const works: WorkCardType[] = [
  {
    title: "SynTwin",
    summary: "The platform and AI agents that bring digital twins to life.",
    company: "SynTwin GmbH",
    img: "/static/images/work/syntwin.webp",
    url: "syntwin.ai",
    href: ["https://syntwin.ai"],
    h: "h-96",
  },
  {
    title: "Pettoo",
    summary: "A care platform that connects pet owners with the services they need.",
    company: "Pettoo UG",
    img: "/static/images/work/pettoo.webp",
    url: "pettoo.de",
    href: ["https://pettoo.de"],
    h: "h-72",
  },
  {
    title: "Discourse Analysis Tool Suite",
    summary: "Tools that help researchers explore and make sense of large text collections.",
    company: "University of Hamburg",
    img: "/static/images/work/dats.webp",
    url: "dats.ltdemos.informatik.uni-hamburg.de",
    href: ["https://dats.ltdemos.informatik.uni-hamburg.de"],
    h: "h-72",
  },
  {
    title: "ACL Anthology Search",
    summary: "Find research papers by what they mean, not the keywords they happen to use.",
    url: "acla.nasrul.info",
    href: ["https://acla.nasrul.info", "https://github.com/nnayz/acl-anthology-rag"],
    h: "h-72",
  },
  {
    title: "MyTorch",
    summary: "A tiny deep-learning framework built from scratch to see how PyTorch really works.",
    img: "/static/images/work/mytorch.webp",
    url: "github.com/nnayz/mytorch",
    href: ["https://github.com/nnayz/mytorch"],
    h: "h-96",
  },
  {
    title: "Bioacoustic Sound Classification",
    summary: "Teaching a model to recognise animal calls from only a handful of examples.",
    href: ["https://github.com/nnayz/uhh_project_dsai"],
    h: "h-48",
  },
  {
    title: "Federated Nicheformer",
    summary: "Training a genomics model across many datasets without ever moving the data.",
    href: ["https://github.com/nnayz/ft-nicheformer"],
    h: "h-48",
  },
];
