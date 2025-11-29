import { cn } from "@/lib/utils";

export function MobileContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className="flex justify-center bg-neutral-100 dark:bg-neutral-900">
      <div className="w-full max-w-md h-dvh bg-background shadow-2xl flex flex-col">
        <div className={cn("flex-1 overflow-y-auto custom-scrollbar", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
