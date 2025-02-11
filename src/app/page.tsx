// pages/index.tsx (Login page)
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to the StudyBuddy App</h1>
      <p className="mb-6">Please login, register, or continue as a guest</p>
      <ul className="flex flex-col md:flex-row gap-4 text-lg font-medium absolute md:static bg-white w-full md:w-auto left-0 p-4 md:p-0 transition-all">
        <li>
          <Button>
            <Link href="/feed">Continue as Guest</Link>
          </Button>
        </li>
        <li>
          <Button>
            <Link href="/register">Register</Link>
          </Button>
        </li>
        <li>
          <Button>
            <Link href="/feed">Login</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default LoginPage;
