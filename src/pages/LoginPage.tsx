import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('');

  if (!auth) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await auth.login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">SaaSKit</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Sign in to your workspace.</p>

        <label className="mt-6 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Sign in
        </button>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Demo auth — any credentials are accepted locally.
        </p>
      </form>
    </div>
  );
}
