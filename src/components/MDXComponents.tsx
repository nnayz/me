import ExternalLink from './ExternalLink';
import Flashcard from './Flashcard';
import { useMDXComponent } from '@content-collections/mdx/react';
import { Link } from 'react-router-dom';

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link to={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <ExternalLink href={href} {...props} />;
};

function RoundedImage(props: any) {
  return <img alt={props.alt} className="rounded-lg" {...props} />;
}

const components = {
  Flashcard,
  Image: RoundedImage,
  a: CustomLink,
};


export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose-quoteless prose prose-neutral dark:prose-invert">
      <Component components={components} />
    </article>
  );
}

export default components;
