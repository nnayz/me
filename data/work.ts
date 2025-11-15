export type WorkCardType = {
  title: string;
  description: string;
  authors?: string[];
  href?: string;
  company?: string;
  img?: string;
  h?: string;
};

export const works: WorkCardType[] = [
  {
    title: "SynTwin AI",
    description: "2025",
    img: "/static/images/work/syntwin.webp",
    href: "https://syntwin.ai",
    company: "SynTwin GmbH",
    h: "h-96",
  },
  {
    title: "Pettoo",
    description: "2025",
    img: "/static/images/work/pettoo.webp",
    href: "https://pettoo.de",
    company: "Pettoo UG",
    h: "h-72",
  },
  {
    title: "DATS",
    description: "2025",
    img: "/static/images/work/dats.webp",
    href: "https://dats.ltdemos.informatik.uni-hamburg.de",
    company: "University of Hamburg",
    h: "h-72",
  },
  {
    title: "MyTorch",
    description: "2025",
    img: "/static/images/work/mytorch.webp",
    company: "Personal Project",
    href: "https://github.com/nnayz/MyTorch",
    h: "h-96",
  }
];
