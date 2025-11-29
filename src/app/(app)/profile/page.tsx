'use client';

import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Mail, Loader2, Phone, Globe } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    // The auth hook will handle redirection
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold font-headline">My Profile</h1>
      </header>

      {user && (
        <Card>
          <CardHeader className="items-center text-center">
            <Image
              src={user.photoURL!}
              alt={user.displayName!}
              width={96}
              height={96}
              className="rounded-full mb-4 border-4 border-primary/50"
            />
            <CardTitle className="text-2xl font-headline">{user.displayName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-muted-foreground bg-muted/50 p-3 rounded-md">
              <User className="h-5 w-5" />
              <span>{user.displayName}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground bg-muted/50 p-3 rounded-md">
              <Mail className="h-5 w-5" />
              <span>{user.email}</span>
            </div>
            <div className="border-t pt-6 mt-6">
              <Button onClick={handleLogout} variant="destructive" className="w-full" disabled={isLoggingOut}>
                {isLoggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Contact Our Consultants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-muted-foreground bg-muted/50 p-3 rounded-md">
            <Phone className="h-5 w-5 text-primary" />
            <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground bg-muted/50 p-3 rounded-md">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:consult@mypetcare.app" className="hover:underline">consult@mypetcare.app</a>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground bg-muted/50 p-3 rounded-md">
            <Globe className="h-5 w-5 text-primary" />
            <a href="https://www.mypetcare.app" target="_blank" rel="noopener noreferrer" className="hover:underline">www.mypetcare.app</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
