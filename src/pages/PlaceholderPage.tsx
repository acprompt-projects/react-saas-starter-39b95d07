import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
        This route is wired into the app shell so every sidebar link resolves.
        The screen itself is a placeholder — only Overview and Billing contain
        real UI in this starter.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        &larr; Back to dashboard
      </Link>
    </div>
  );
}
