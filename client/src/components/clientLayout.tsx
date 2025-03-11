'use client';

// this is fine for now

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === '/' || pathname === '/signup' || pathname === '/signup/create';

  // Paths where create post button should be hidden
  const hideCreatePost = ['/settings', '/messages'];
  const shouldShowCreatePost =
    !hideCreatePost.includes(pathname) && !pathname.startsWith('/profile');

  return (
    <>
      {!isAuthPage && <Header />}
      <div className="flex">
        {!isAuthPage && <Sidebar />}
        <main
          className={`flex-1 ${!isAuthPage ? 'pt-16 pb-16 md:pb-0' : ''} px-4`}
        >
          {children}
        </main>
      </div>
      {!isAuthPage && <Footer showCreatePost={shouldShowCreatePost} />}
    </>
  );
}
