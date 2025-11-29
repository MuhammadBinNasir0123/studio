import { Logo } from "@/components/icons/logo";
import { Card } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="mx-auto w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <Logo className="h-20 w-20 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline mb-2 text-foreground">MyPetcare app</h1>
        <CardDescription className="mb-6">Your best friend's best friend.</CardDescription>
        <Card className="shadow-lg text-left">
          {children}
        </Card>
      </div>
    </main>
  );
}
