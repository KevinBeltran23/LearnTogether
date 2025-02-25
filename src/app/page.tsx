'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseconfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';

// Constant for text strings
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
  invalidCredentials: 'Invalid email or password',
  googleLoginError: 'Failed to login with Google',
  signUpLink: 'Sign up',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) {
        setError(TEXTS.invalidCredentials);
        return;
      }
      setEmail('');
      setPassword('');
      router.push('/feed');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(TEXTS.errorAlert);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!result) {
        setError(TEXTS.googleLoginError);
        return;
      }
      router.push('/feed');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(TEXTS.errorAlert);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full min-h-screen sm:min-h-fit sm:w-[24rem] sm:rounded-xl p-6 sm:p-8 bg-white sm:shadow-lg flex flex-col justify-center">
        <section className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {TEXTS.title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{TEXTS.subtitle}</p>
        </section>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
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
              className="text-sm font-medium text-gray-700"
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
            />
          </div>

          <Button type="submit" className="w-full h-11 text-base">
            {TEXTS.signInButton}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
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
        <p className="mt-8 text-center text-sm text-gray-600">
          {TEXTS.signUpText}{' '}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            {TEXTS.signUpLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
