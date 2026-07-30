"use client";

interface ColorProps {
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

export default function Color({ selectedColor, setSelectedColor }: ColorProps) {
  const presetColors = [
    "#ff5733",
    "#33ff57",
    "#3357ff",
    "#f3ff33",
    "#ff33f3",
    "#33fff3",
    "#ffffff",
    "#111111",
  ];

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 bg-[#141419]/85 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl backdrop-blur-md flex-wrap md:flex-nowrap items-center gap-2.5 sm:gap-3 border border-white/10 md:max-w-[93vw] overflow-x-auto scrollbar-none shadow-2xl">
      <span className="text-white text-xs sm:text-sm font-sans  mr-1">
        Current color:
      </span>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer transition-transform duration-100 hover:scale-110 shrink-0 ${
              selectedColor === color
                ? "border-2 sm:border-[3px] border-white scale-105 shadow-md"
                : "border border-black/30"
            }`}
          />
        ))}

        {/* Selector con input de color nativo */}
        <div className="relative w-8 h-8 sm:w-[38px] sm:h-[38px] rounded-full flex justify-center items-center shrink-0 bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="absolute inset-1 w-6 h-6 sm:w-[30px] sm:h-[30px] border-none rounded-full cursor-pointer bg-transparent p-0 outline-none appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full"
            title="Elige un color personalizado"
          />
        </div>
      </div>
    </div>
  );
}
