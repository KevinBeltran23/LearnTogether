'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/index.css';
import { AuthProvider } from '@/context/authContext';
import { SidebarProvider } from '@/context/sidebarContext';
import ClientLayout from '@/components/clientLayout';
import { SearchProvider } from '@/context/searchContext';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { ProfileProvider } from '@/context/profileContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function ProvidersAfterMount({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeProvider attribute="class" enableSystem={false}>{children}</ThemeProvider>;
}

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
        <ProvidersAfterMount>
          <AuthProvider>
            <ProfileProvider>
              <SidebarProvider>
                <SearchProvider>
                  <ClientLayout>{children}</ClientLayout>
                </SearchProvider>
              </SidebarProvider>
            </ProfileProvider>
          </AuthProvider>
        </ProvidersAfterMount>
      </body>
    </html>
  );
}