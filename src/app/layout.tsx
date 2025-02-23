import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/index.css';
import { AuthProvider } from '@/context/authContext';
import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { SidebarProvider } from '@/context/sidebarContext';
import Sidebar from '@/components/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'StudyBuddy',
  description: 'Find your perfect study partner!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SidebarProvider>
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 pt-16 pb-16 md:pb-0 px-4">
                {children}
              </main>
            </div>
            <Footer />
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
