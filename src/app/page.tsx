'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseconfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';

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
        setError('Invalid email or password');
        return;
      }
      setEmail('');
      setPassword('');
      router.push('/feed');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during login');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!result) {
        setError('Failed to login with Google');
        return;
      }
      router.push('/feed');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during Google login');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Welcome to StudyBuddy
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <div className="mt-4 space-y-2">
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
        >
          Login with Google
        </Button>

        <Button variant="outline" className="w-full">
          <Link href="/feed" className="w-full">
            Continue as Guest
          </Link>
        </Button>
      </div>

      <p className="text-center text-sm mt-4">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
