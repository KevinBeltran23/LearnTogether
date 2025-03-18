'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendPostRequest } from '@/requests/sendPostRequest';
import { useAuth } from '@/context/authContext';

import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TEXTS = {
  title: 'Create Account',
  subtitle: 'Please sign up to continue',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm Password',
  createAccountButton: 'Create Account',
  signInLink: 'Sign in',
  errorAlert: 'An error occurred during signup',
  signInLinkText: 'Already have an account?',
  loadingMessage: 'Creating your account...',
  loginRedirect: 'Account created! Please proceed to login.',
  registrationError: 'An error occurred during registration',
  userExists: 'Username already exists.',
};

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useAuth();
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration data:', { username: email, password });
      // Register the user
      const response = await sendPostRequest(`${API_URL}/auth/register`, { 
        username: email,
        password 
      });

      console.log(response);

      // Try to login immediately after successful registration
      try {
        const loginResponse = await sendPostRequest(`${API_URL}/auth/login`, { 
          username: email, 
          password 
        });
        
        const result = await loginResponse.json();
        const authToken = result.token;
        
        // Store the token (you might want to use a more secure method)
        setToken(authToken);
        
        // Clear form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to create profile page
        router.push('/signup/create');
      } catch (loginError) {
        // Registration worked but login failed
        setError(TEXTS.loginRedirect);
        setTimeout(() => router.push('/'), 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = TEXTS.registrationError;
      
      if ((error as Error).message?.includes('400')) {
        errorMessage = TEXTS.userExists;
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

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {TEXTS.confirmPasswordLabel}
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading ? TEXTS.loadingMessage : TEXTS.createAccountButton}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          {TEXTS.signInLinkText}{' '}
          <Link
            href="/"
            className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {TEXTS.signInLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
