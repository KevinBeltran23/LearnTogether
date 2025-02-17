'use client';

import { useAuth } from '@/context/authContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const { user, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to StudyBuddy</h1>
      {user ? (
        <>
          <p className="mb-4">Logged in as {user.displayName}</p>
          <Button onClick={logout}>Logout</Button>
          <Button>
            <Link href="/feed">Go to Feed</Link>
          </Button>
        </>
      ) : (
        <>
          <p className="mb-6">Login, register, or continue as a guest</p>
          <ul className="flex flex-col md:flex-row gap-4 text-lg font-medium">
            <li>
              <Button>
                <Link href="/feed">Continue as Guest</Link>
              </Button>
            </li>
            <li>
              <Button onClick={handleGoogleLogin}>Login with Google</Button>
            </li>
          </ul>
        </>
      )}
    </section>
  );
};

export default LoginPage;
