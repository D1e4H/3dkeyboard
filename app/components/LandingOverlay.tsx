"use client";

import AnimatedButton from "./AnimatedButton";

type LandingOverlayProps = {
  entered: boolean;
  onEnter: () => void;
};

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export default function LandingOverlay({ entered, onEnter }: LandingOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-start gap-8 px-6 pt-[10vh] text-center text-white">
      <div className="overflow-hidden">
        <p
          className={`text-xs font-medium uppercase tracking-[0.5em] text-white/40 transition-all duration-700 ${EASE} ${
            entered ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          Mechanical Series
        </p>
      </div>

      <h1 className="flex flex-wrap items-baseline justify-center gap-x-5 text-7xl font-bold tracking-tight sm:text-9xl">
        <span
          className={`inline-block transition-all duration-[900ms] ${EASE} ${
            entered
              ? "-translate-x-[45vw] rotate-[-6deg] opacity-0"
              : "translate-x-0 rotate-0 opacity-100"
          }`}
        >
          NOVA
        </span>
        <span
          className={`inline-block text-white/25 transition-all duration-[1100ms] ${EASE} ${
            entered
              ? "translate-x-[45vw] rotate-[6deg] opacity-0"
              : "translate-x-0 rotate-0 opacity-100"
          }`}
        >
          65
        </span>
      </h1>

      <p
        className={`max-w-md text-lg leading-relaxed text-white/50 transition-all delay-75 duration-700 ${EASE} ${
          entered ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        A keyboard crafted in three dimensions. Press start to step into the
        studio.
      </p>

      <div
        className={`pointer-events-auto transition-all delay-150 duration-700 ${EASE} ${
          entered
            ? "pointer-events-none translate-y-16 scale-90 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <AnimatedButton label="Enter the Studio" onClick={onEnter} />
      </div>
    </div>
  );
}
