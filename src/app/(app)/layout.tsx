'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { BottomNav } from '@/components/bottom-nav';
import { MobileContainer } from '@/components/mobile-container';
import { Loader2 } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900">
        <div className="w-full max-w-md mx-auto bg-background flex flex-col h-dvh shadow-lg">
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
          <BottomNav />
        </div>
    </div>
  );
}
