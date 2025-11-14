import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-8 px-8 py-16">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-secondary text-center">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        className="text-primary underline hover:no-underline"
        to="/"
      >
        Go back home
      </Link>
    </div>
  );
}

