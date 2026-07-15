"use client";

type AnimatedButtonProps = {
  label: string;
  onClick: () => void;
};

export default function AnimatedButton({ label, onClick }: AnimatedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/70 bg-transparent outline-none transition-transform duration-300 active:scale-95 focus-visible:ring-4 focus-visible:ring-white/20"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100"
      />
      <span className="relative z-10 flex items-center gap-2 px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-black">
        {label}
        <svg
          className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}
