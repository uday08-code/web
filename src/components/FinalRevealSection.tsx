import React, { useState } from 'react';
import { Heart, RotateCcw, ArrowUp } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { soundEngine } from '../utils/soundEngine';

interface FinalRevealSectionProps {
  config: AnniversaryConfig;
  onReturnToMainStory: () => void;
}

export const FinalRevealSection: React.FC<FinalRevealSectionProps> = ({
  config,
  onReturnToMainStory,
}) => {
  const [celebrated, setCelebrated] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);

  const handleCelebrate = () => {
    setCelebrated(true);
    setCelebrationKey((k) => k + 1);
    soundEngine.playSoundEffect('celebration');
  };

  const handleReplay = () => {
    setCelebrationKey((k) => k + 1);
    soundEngine.playSoundEffect('celebration');
  };

  return (
    <section
      id="surprise"
      aria-labelledby="final-reveal-heading"
      className="relative min-h-[85vh] py-28 px-6 flex items-center justify-center bg-gradient-to-b from-[#0E0609] via-[#1D0911] to-[#0B0608] text-[#FAF6F0] border-t border-[#D4AF37]/30 overflow-hidden"
    >
      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.12)_0%,rgba(11,6,8,0.92)_75%)]"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Animated Floral Composition Emblem */}
        <div className="w-32 h-24 mx-auto mb-6">
          <svg
            viewBox="0 0 200 120"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M25,85 Q100,25 175,85"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <circle cx="65" cy="65" r="14" fill="#9E2845" />
            <circle cx="65" cy="65" r="7" fill="#F4D3DC" />
            <circle cx="135" cy="65" r="14" fill="#9E2845" />
            <circle cx="135" cy="65" r="7" fill="#F4D3DC" />
            <circle cx="100" cy="52" r="20" fill="#7A1C32" />
            <circle cx="100" cy="52" r="12" fill="#D98A9C" />
            <circle cx="100" cy="52" r="5" fill="#E8D3A8" />
          </svg>
        </div>

        {/* Unboxed Date Metadata */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-4">
          <span>OCTOBER 20</span>
          <span aria-hidden="true">·</span>
          <span>OUR FIRST ANNIVERSARY FINALE</span>
        </div>

        <h2
          id="final-reveal-heading"
          className="font-serif-editorial text-5xl sm:text-6xl font-semibold text-[#FAF6F0] tracking-tight mb-4"
          style={{ textWrap: 'balance' }}
        >
          {config.finalRevealTitle}
        </h2>

        <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#F4D3DC] mb-8">
          {config.finalRevealSubtitle}
        </p>

        <div className="my-8 py-5 border-y border-[#D4AF37]/25 max-w-lg mx-auto">
          <p className="font-serif-editorial text-2xl sm:text-3xl text-[#E8D3A8] font-semibold">
            {config.yourName} <span className="text-[#D98A9C] mx-2">+</span> {config.partnerName}
          </p>
          <p className="mt-1.5 text-xs font-mono-tabular uppercase tracking-widest text-[#C4B2B8]">
            October 20 · Forever &amp; Always
          </p>
        </div>

        {/* Primary Celebration Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleCelebrate}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#7A1C32] hover:bg-[#91223C] text-[#FAF6F0] font-medium text-base border border-[#D4AF37]/50 shadow-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>CELEBRATE OUR LOVE ❤️</span>
          </button>

          <button
            type="button"
            onClick={onReturnToMainStory}
            className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-[#1A0B11] hover:bg-[#2A1019] text-[#E8D3A8] text-xs font-medium border border-[#D4AF37]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Return to Main Story</span>
          </button>
        </div>

        {/* Celebration Reveal Box */}
        {celebrated && (
          <div
            key={celebrationKey}
            data-testid="final-celebration-reveal"
            className="mt-10 rounded-2xl bg-[#1F0B13]/95 border border-[#D4AF37]/50 p-8 sm:p-10 shadow-2xl animate-bloom"
          >
            {/* Tasteful Heart & Floral Burst */}
            <div className="flex items-center justify-center gap-3 mb-4 text-[#D98A9C]">
              <Heart className="w-5 h-5 fill-[#D98A9C]" />
              <Heart className="w-7 h-7 fill-[#7A1C32] text-[#E8D3A8]" />
              <Heart className="w-5 h-5 fill-[#D98A9C]" />
            </div>

            <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FAF6F0] leading-relaxed mb-6">
              &ldquo;{config.finalClosingMessage}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2B101A] hover:bg-[#3B1624] text-xs font-medium text-[#E8D3A8] border border-[#D4AF37]/35 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Final Animation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
