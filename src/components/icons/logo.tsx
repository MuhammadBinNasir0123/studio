import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
    >
      <path d="M11.64 10.36c0-2.21-1.79-4-4-4s-4 1.79-4 4a4 4 0 0 0 6.9 2.83c.45-.33.94-.58 1.48-.73a4 4 0 0 1-.38-2.1zM18 19h.01" />
      <path d="M12.92 10.22c.42.04.83.15 1.2.31a4 4 0 0 1 3.88-5.53 4 4 0 0 1 4 4c0 .8-.25 1.54-.66 2.15" />
      <path d="M22 13.52c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.12.46-2.14 1.2-2.85" />
      <path d="M16 10.36a4 4 0 0 0-3.36-1.53 4 4 0 0 0-3.28 2.65c.5.18 1 .46 1.43.83A4 4 0 0 1 16 10.36z" />
      <path d="M10.92 18.3c-.56-.16-1.07-.44-1.52-.8-.92-.7-1.4-1.79-1.4-2.99 0-2.21 1.79-4 4-4 .19 0 .37.01.55.04" />
    </svg>
  );
}
