'use client';

import * as React from 'react';
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


export default function SignupPage() {
  const { signup, loading } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isHuman, setIsHuman] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHuman) {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: 'Please confirm you are human.',
      });
      return;
    }
    try {
      await signup(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join MyPetcare app to start managing your pets</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="is-human" checked={isHuman} onCheckedChange={(checked) => setIsHuman(checked as boolean)} disabled={loading} />
              <Label htmlFor="is-human" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I am human
              </Label>
            </div>
          </div>
          <Button className="w-full mt-6" type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">Already have an account? <Link href="/login" className="text-primary hover:underline">Sign In</Link></p>
      </CardFooter>
    </>
  );
}
