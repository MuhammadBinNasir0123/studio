'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from '@/lib/types';
import { sampleUser } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // NOTE: Removed session storage to prevent stale data issues.
    // Simulating a session check. In a real app, this would be a token check.
    if (user) {
        setUser(user);
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (!loading && !user && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  const login = async (email?: string, password?: string) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1000)); // Simulate API call
    setUser(sampleUser);
    setLoading(false);
    router.push('/dashboard');
  };

  const googleLogin = async () => {
    await login();
  };
  
  const signup = async (email?: string, password?: string) => {
    await login();
  }

  const logout = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setUser(null);
    setLoading(false);
    router.push('/login');
  };

  const value = { user, loading, login, googleLogin, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
