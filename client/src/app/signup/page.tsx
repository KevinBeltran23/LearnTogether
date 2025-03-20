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
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration data:', { email, password });
      // Register the user
      const registrationResult = await sendPostRequest(`${API_URL}/auth/register`, { 
        email,
        password 
      });

      console.log(registrationResult);
      
      // Check if registration failed
      if (!registrationResult.ok) {
        // Handle different registration error cases
        if (registrationResult.status === 400) {
          setError(TEXTS.userExists);
        } else if (registrationResult.status === 422) {
          setError('Invalid email or password format. Please check your input.');
        } else if (registrationResult.status >= 500) {
          setError('Server error during registration. Please try again later.');
        } else {
          // Use the error message from the response if available
          setError(registrationResult.error?.message || TEXTS.registrationError);
        }
        return;
      }
      
      // If we reach here, registration was successful
      // Store email in localStorage for profile creation
      localStorage.setItem('userEmail', email);

      // Try to login immediately after successful registration
      const loginResult = await sendPostRequest(`${API_URL}/auth/login`, { 
        email, 
        password 
      });
      
      if (!loginResult.ok) {
        // Registration worked but login failed
        setError(TEXTS.loginRedirect);
        setTimeout(() => router.push('/'), 1500);
        return;
      }
      
      // Login successful
      const authToken = loginResult.data.token;
      
      // Store the token
      setToken(authToken);
      
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Redirect to create profile page
      router.push('/signup/create');
      
    } catch (error) {
      // This should rarely happen with the new implementation
      console.error("Unexpected error during registration flow:", error);
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
