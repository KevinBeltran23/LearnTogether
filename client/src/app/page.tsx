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
  googleSignInButton: 'Continue with Google',
  guestSignInButton: 'Continue as Guest',
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

    try {
      const response = await sendPostRequest(`${API_URL}/auth/login`, {
        email, 
        password,
      });

      const result = await response.json();
      const authToken = result.token;

      // Store the token (consider using a more secure method)
      setToken(authToken);

      setEmail('');
      setPassword('');
      
      // Redirect to feed page after successful login
      router.push('/feed');
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = TEXTS.errorAlert;

      if ((error as Error).message?.includes('401')) {
        errorMessage = TEXTS.invalidCredentials;
      } else if ((error as Error).message) {
        try {
          const errorData = JSON.parse((error as Error).message);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = (error as Error).message;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Modify or remove Google login if not implementing OAuth
  const handleGoogleLogin = async () => {
    setError('Google login is not implemented yet');
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

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-zinc-950 text-gray-500 dark:text-gray-400">
              Or
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-11 text-base font-medium"
          >
            {TEXTS.googleSignInButton}
          </Button>

          <Button
            variant="outline"
            className="w-full h-11 text-base font-medium"
          >
            <Link href="/feed" className="w-full">
              {TEXTS.guestSignInButton}
            </Link>
          </Button>
        </div>

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
