import { Logo } from "@/components/icons/logo";
import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo className="h-12 w-12 text-primary" />
        </div>
        <Card className="shadow-lg">
          {children}
        </Card>
      </div>
    </main>
  );
}
