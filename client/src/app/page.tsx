'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendPostRequest } from '@/requests/sendPostRequest';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Updated TEXTS constant
const TEXTS = {
  title: 'Welcome Back',
  subtitle: 'Please sign in to continue',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  signInButton: 'Sign In',
  signUpText: "Don't have an account?",
  errorAlert: 'An error occurred during login',
  invalidCredentials: 'Incorrect username or password',
  loadingMessage: 'Logging in...',
  signUpLink: 'Sign up',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await sendPostRequest(`${API_URL}/auth/login`, {
        email, 
        password,
      });

      if (!result.ok) {
        // Handle different error status codes
        if (result.status === 401) {
          setError(TEXTS.invalidCredentials);
        } else if (result.status === 403) {
          setError('Access forbidden. Your account may be suspended.');
        } else if (result.status === 429) {
          setError('Too many login attempts. Please try again later.');
        } else if (result.status >= 500) {
          setError('Server error. Please try again later.');
        } else {
          // Use the error message from the response if available
          setError(result.error?.message || TEXTS.errorAlert);
        }
        return;
      }

      // Successfully logged in
      const authToken = result.data.token;

      // Store the token
      setToken(authToken);

      setEmail('');
      setPassword('');
      
      // Redirect to feed page after successful login
      router.push('/feed');
    } catch (error) {
      // This should rarely happen with the new implementation
      console.error("Unexpected login error:", error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <div className="w-full min-h-screen sm:min-h-fit sm:w-[24rem] sm:rounded-xl p-6 sm:p-8 bg-white dark:bg-zinc-950 sm:shadow-lg dark:sm:shadow-zinc-800/20 flex flex-col justify-center">
        <section className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {TEXTS.title}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {TEXTS.subtitle}
          </p>
        </section>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {TEXTS.emailLabel}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {TEXTS.passwordLabel}
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base"
            disabled={isLoading}
          >
            {isLoading ? TEXTS.loadingMessage : TEXTS.signInButton}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          {TEXTS.signUpText}{' '}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {TEXTS.signUpLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
