'use client';

// this is fine for now

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="flex items-center">
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle Dark Mode"
      />
    </div>
  );
}
