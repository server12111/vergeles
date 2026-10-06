import Link from "next/link";

/** Arch mark: a single architectural opening drawn with a hairline. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 18"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M0.5 17.5V7a6.5 6.5 0 0 1 13 0v10.5" />
      <path d="M0 17.5h14" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="VERGELES — на главную"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <Mark className="h-[15px] w-auto" />
      <span className="wordmark text-[13px] leading-none">Vergeles</span>
    </Link>
  );
}
