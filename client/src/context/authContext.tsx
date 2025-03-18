'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize token from localStorage if it exists
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Update localStorage when token changes
  useEffect(() => {
    // Initialize auth state
    setIsLoading(false);
    
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    router.push('/');
  };

  const value = {
    token,
    setToken,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Simple hook to protect routes
function useRequireAuth() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      // Immediate redirect if no token
      router.replace('/');
    }
  }, [token, isLoading, router]);

  // Return authentication status to allow conditional rendering
  return { isAuthenticated: !!token && !isLoading, isLoading };
}

// New component for protecting routes
export function ProtectedComponent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useRequireAuth();
  
  if (isLoading) {
    return null; 
  }
  return isAuthenticated ? <>{children}</> : null;
}
