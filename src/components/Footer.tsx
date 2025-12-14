export default function Footer() {
  return (
    <footer className="text-quaternary mx-auto max-w-2xl border-gray-200 px-8 py-12 pb-24 pt-4 text-sm dark:border-gray-200 dark:text-gray-600">

      <p className="flex flex-col gap-4 mt-6">
        © 2021 - {new Date().getFullYear()} Nasrul Huda. All Rights Reserved.
        <span>www.nasrul.info v.2024.06</span>
        <span>
          Website built using Vite [
          <a
            href="https://github.com/nnayz/me"
            rel="noopener noreferrer"
            target="_blank"
          >
            view source
          </a>
          ].
        </span>
      </p>
    </footer>
  );
}
