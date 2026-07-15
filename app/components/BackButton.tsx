"use client";

type BackButtonProps = {
  onClick: () => void;
};

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group animate-slide-in-left absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm outline-none transition-all duration-300 hover:border-white hover:bg-white hover:text-black active:scale-95 focus-visible:ring-4 focus-visible:ring-white/20"
    >
      <svg
        className="h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:-translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      Back
    </button>
  );
}
