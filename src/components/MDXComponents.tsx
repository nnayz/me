import ExternalLink from './ExternalLink';
import Flashcard from './Flashcard';
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

export default components;
