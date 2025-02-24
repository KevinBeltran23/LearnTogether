'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/index.css';
import { AuthProvider } from '@/context/authContext';
import { SidebarProvider } from '@/context/sidebarContext';
import ClientLayout from '@/components/clientLayout';
import { SearchProvider } from '@/context/searchContext';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SidebarProvider>
              <SearchProvider>
                <ClientLayout>{children}</ClientLayout>
              </SearchProvider>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
