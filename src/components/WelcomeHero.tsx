import React, { useState } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { calculateAnniversaryStatus } from '../utils/anniversaryLogic';

interface WelcomeHeroProps {
  config: AnniversaryConfig;
  isOpened: boolean;
  onOpenSurprise: () => void;
  isMusicPlaying: boolean;
  isMuted: boolean;
  onToggleMusic: () => void;
  onToggleMute: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  config,
  isOpened,
  onOpenSurprise,
  isMusicPlaying,
  isMuted,
  onToggleMusic,
  onToggleMute,
}) => {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  const status = calculateAnniversaryStatus(
    new Date(),
    config.anniversaryIsoDate,
    config.originalMilestoneIsoDate
  );

  const handleTriggerOpen = () => {
    setIsOpeningAnim(true);
    setTimeout(() => {
      onOpenSurprise();
      setIsOpeningAnim(false);
    }, 450);
  };

  return (
    <section
      id="home"
      aria-label="Welcome Screen"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-[#0B0608] via-[#1C0910] to-[#12070B]"
    >
      {/* Subtle Romantic Vignette & Soft Blurred Light Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(122,28,50,0.28)_0%,rgba(11,6,8,0.88)_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-[#D4AF37]/10 blur-3xl animate-pulse-glow"
      />

      {/* Visible Sound / Mute Control in top-right of Welcome Scene */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? 'Pause background music' : 'Play background music'}
          className="px-3.5 py-2 rounded-lg bg-[#1F0D14]/85 border border-[#D4AF37]/30 text-xs font-medium text-[#E8D3A8] hover:border-[#D4AF37] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4 text-[#C4B2B8]" />}
          <span>{isMusicPlaying ? 'Music Playing' : 'Music Paused'}</span>
        </button>
        {isMusicPlaying && (
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="px-3 py-2 rounded-lg bg-[#1F0D14]/85 border border-[#D4AF37]/25 text-xs text-[#FAF6F0] hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        )}
      </div>

      {/* Center Content */}
      <div
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-500 ${
          isOpeningAnim ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Unboxed Editorial Metadata Kicker (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono-tabular tracking-widest uppercase text-[#E8D3A8] mb-6">
          <span>FIRST ANNIVERSARY EDITION</span>
          <span aria-hidden="true">·</span>
          <span>{config.anniversaryDisplayDate}</span>
          <span aria-hidden="true">·</span>
          <span>{status.secondaryLabel}</span>
        </div>

        {/* Main Display Title */}
        <h1
          className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#FAF6F0] mb-6"
          style={{ textWrap: 'balance' }}
        >
          {config.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#F4D3DC] mb-10 max-w-xl mx-auto leading-relaxed">
          &ldquo;{config.heroSubtitle}&rdquo;
        </p>

        {/* Customizable Couple Names */}
        <div className="my-8 py-6 border-y border-[#D4AF37]/25 max-w-xl mx-auto">
          <p className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl text-[#E8D3A8] tracking-wide font-semibold">
            {config.yourName} <span className="text-[#D98A9C] mx-2">+</span> {config.partnerName}
          </p>
          <p className="mt-2 text-xs font-mono-tabular tracking-widest uppercase text-[#C4B2B8]">
            {config.anniversaryDisplayDate} · {status.displayLabel}
          </p>
        </div>

        {/* Smart Anniversary Date / Countdown Visual (Respects rule: never show countdown if Oct 20 passed) */}
        {status.mode === 'countdown' ? (
          <div
            aria-label="Countdown to October 20 Anniversary"
            className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10 py-4 px-6 rounded-xl bg-[#1A0B10]/80 border border-[#D4AF37]/25"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-mono-tabular font-semibold text-[#FAF6F0]">
                {String(status.daysUntilAnniversary).padStart(2, '0')}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#C4B2B8] mt-1">Days</div>
            </div>
            <div className="border-x border-[#D4AF37]/20">
              <div className="text-2xl sm:text-3xl font-mono-tabular font-semibold text-[#FAF6F0]">
                {String(status.hoursUntilAnniversary).padStart(2, '0')}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#C4B2B8] mt-1">Hours</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono-tabular font-semibold text-[#FAF6F0]">
                {String(status.minutesUntilAnniversary).padStart(2, '0')}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#C4B2B8] mt-1">Minutes</div>
            </div>
          </div>
        ) : (
          <div
            aria-label="Anniversary Celebration Milestone"
            className="max-w-lg mx-auto mb-10 py-4 px-6 rounded-xl bg-[#1A0B10]/80 border border-[#D4AF37]/30"
          >
            <p className="font-serif-editorial text-lg sm:text-xl text-[#FAF6F0]">
              Happy First Anniversary — Celebrating <span className="font-mono-tabular text-[#E8D3A8] font-semibold">{status.daysSinceMilestone}</span> Days Since Our Forever Began
            </p>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleTriggerOpen}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#7A1C32] hover:bg-[#91223C] text-[#FAF6F0] font-medium text-base tracking-wide border border-[#D4AF37]/50 shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>OPEN YOUR SURPRISE 💌</span>
          </button>
        </div>

        {/* Heart burst feedback when clicked */}
        {isOpeningAnim && (
          <div className="mt-6 flex items-center justify-center gap-3 text-[#F4D3DC]">
            <Heart className="w-6 h-6 fill-[#D98A9C] animate-bounce" />
            <span className="text-sm font-serif-editorial italic">Opening your anniversary story...</span>
            <Heart className="w-6 h-6 fill-[#D98A9C] animate-bounce" />
          </div>
        )}

        {isOpened && !isOpeningAnim && (
          <p className="mt-6 text-xs text-[#C4B2B8] font-mono-tabular">
            Scroll down or use the navigation menu above to explore every chapter of our first year.
          </p>
        )}
      </div>
    </section>
  );
};
