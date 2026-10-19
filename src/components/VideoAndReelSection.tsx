import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Film, Sparkles } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { RomanticArtFrame } from './RomanticArtFrame';

interface VideoAndReelSectionProps {
  config: AnniversaryConfig;
}

export const VideoAndReelSection: React.FC<VideoAndReelSectionProps> = ({ config }) => {
  const [mode, setMode] = useState<'reel' | 'video'>('reel');
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingReel, setIsPlayingReel] = useState(true);

  const slides = [
    ...config.galleryPhotos.map((p) => ({
      title: p.caption,
      date: p.date,
      subtitle: p.description,
      theme: p.artworkTheme,
      src: p.filename,
    })),
    {
      title: `${config.yourName} + ${config.partnerName} · Happy First Anniversary`,
      date: config.anniversaryDisplayDate,
      subtitle: config.finalClosingMessage,
      theme: 'rings' as const,
      src: undefined,
    },
  ];

  // Check if a local personal MP4 file actually exists at config.optionalVideoFilename
  useEffect(() => {
    let mounted = true;
    if (config.optionalVideoFilename) {
      fetch(config.optionalVideoFilename, { method: 'HEAD' })
        .then((res) => {
          const contentType = res.headers.get('content-type') || '';
          if (mounted && res.ok && contentType.includes('video')) {
            setVideoAvailable(true);
            setMode('video');
          }
        })
        .catch(() => {
          // Gracefully remain in Mode B (Animated Memory Reel)
        });
    }
    return () => {
      mounted = false;
    };
  }, [config.optionalVideoFilename]);

  // Advance Animated Memory Reel when playing
  useEffect(() => {
    if (mode !== 'reel' || !isPlayingReel) return;
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [mode, isPlayingReel, slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section
      id="video-reel"
      aria-labelledby="video-reel-heading"
      className="relative py-24 px-6 bg-[#14080C] text-[#FAF6F0] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading & Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-3">
              <span>CINEMATIC SHOWCASE</span>
              <span aria-hidden="true">·</span>
              <span>MODE A &amp; MODE B SUPPORTED</span>
            </div>
            <h2
              id="video-reel-heading"
              className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {config.videoSectionHeading}
            </h2>
          </div>

          {/* Interactive Mode Selector (Functional Segmented Buttons) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1E0B12] border border-[#D4AF37]/30 self-start">
            <button
              type="button"
              onClick={() => setMode('reel')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                mode === 'reel'
                  ? 'bg-[#7A1C32] text-[#FAF6F0] shadow-sm'
                  : 'text-[#C4B2B8] hover:text-[#FAF6F0]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Animated Memory Reel</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('video')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                mode === 'video'
                  ? 'bg-[#7A1C32] text-[#FAF6F0] shadow-sm'
                  : 'text-[#C4B2B8] hover:text-[#FAF6F0]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Personal MP4 Video</span>
            </button>
          </div>
        </div>

        {/* Viewport Container */}
        {mode === 'reel' ? (
          <div className="rounded-2xl bg-[#1C0A11] border border-[#D4AF37]/35 p-4 sm:p-6 shadow-2xl">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0B0608] border border-[#D4AF37]/25">
              <div key={currentSlide} className="w-full h-full animate-ken-burns">
                <RomanticArtFrame
                  theme={activeSlide.theme}
                  src={activeSlide.src}
                  alt={activeSlide.title}
                  className="w-full h-full"
                />
              </div>

              {/* Scrim & Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-10">
                <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-2">
                  <span>
                    SLIDE {currentSlide + 1} OF {slides.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSlide.date}</span>
                </div>
                <h3 className="font-serif-editorial text-2xl sm:text-4xl font-semibold text-[#FAF6F0] mb-2">
                  {activeSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F4D3DC] max-w-2xl leading-relaxed">
                  {activeSlide.subtitle}
                </p>
              </div>
            </div>

            {/* Slideshow Transport Controls */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  aria-label="Previous memory slide"
                  className="p-2.5 rounded-lg bg-[#2A1019] hover:bg-[#3A1622] text-[#FAF6F0] border border-[#D4AF37]/30 transition-colors cursor-pointer"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlayingReel((p) => !p)}
                  aria-label={isPlayingReel ? 'Pause memory reel' : 'Play memory reel'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {isPlayingReel ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Reel</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Play Reel</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  aria-label="Next memory slide"
                  className="p-2.5 rounded-lg bg-[#2A1019] hover:bg-[#3A1622] text-[#FAF6F0] border border-[#D4AF37]/30 transition-colors cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Progress Indicators */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide
                        ? 'w-8 bg-[#D4AF37]'
                        : 'w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Mode A: Personal MP4 Video Player */
          <div className="rounded-2xl bg-[#1C0A11] border border-[#D4AF37]/35 p-6 sm:p-8 shadow-2xl">
            {videoAvailable ? (
              <video
                controls
                preload="metadata"
                className="w-full aspect-[16/9] rounded-xl bg-black border border-[#D4AF37]/30"
              >
                <source src={config.optionalVideoFilename} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <div className="aspect-[16/9] w-full rounded-xl bg-[#12060A] border border-[#D4AF37]/30 p-8 flex flex-col items-center justify-center text-center">
                <Film className="w-12 h-12 text-[#E8D3A8] mb-4" />
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#FAF6F0] mb-2">
                  Optional Personal MP4 Video Slot
                </h3>
                <p className="text-sm text-[#C4B2B8] max-w-lg mb-6 leading-relaxed">
                  To play a personal anniversary video in Mode A, place your MP4 file at{' '}
                  <code className="text-[#E8D3A8] font-mono-tabular">
                    {config.optionalVideoFilename}
                  </code>
                  . When no local MP4 file is present, the site automatically defaults to the Animated Memory Reel (Mode B).
                </p>
                <button
                  type="button"
                  onClick={() => setMode('reel')}
                  className="px-6 py-3 rounded-xl bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 transition-colors cursor-pointer"
                >
                  Return to Animated Memory Reel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
