import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUp, Volume2, VolumeX, SlidersHorizontal, Sparkles } from 'lucide-react';
import { DEFAULT_ANNIVERSARY_CONFIG, AnniversaryConfig } from './data/anniversaryConfig';
import { soundEngine } from './utils/soundEngine';
import { ParticleCanvas } from './components/ParticleCanvas';
import { WelcomeHero } from './components/WelcomeHero';
import { LoveStorySection } from './components/LoveStorySection';
import { MemoryGallerySection } from './components/MemoryGallerySection';
import { FlowersAndNotesSection } from './components/FlowersAndNotesSection';
import { AnniversaryLetterSection } from './components/AnniversaryLetterSection';
import { TimelineSection } from './components/TimelineSection';
import { VideoAndReelSection } from './components/VideoAndReelSection';
import { SurpriseButtonsSection } from './components/SurpriseButtonsSection';
import { FinalRevealSection } from './components/FinalRevealSection';
import { PersonalizeDrawer } from './components/PersonalizeDrawer';

const STORAGE_KEY = 'anniversary_love_story_config_v1';

export function App() {
  const [config, setConfig] = useState<AnniversaryConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_ANNIVERSARY_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_ANNIVERSARY_CONFIG;
  });

  const [isExperienceOpened, setIsExperienceOpened] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [errorPreview, setErrorPreview] = useState<'none' | '404' | '500'>('none');

  // Monitor scroll for Back to Top button
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setErrorPreview('none');
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSurprise = async () => {
    setIsExperienceOpened(true);
    // Start romantic music only after user gesture, per Section 4 & Section 13
    const started = await soundEngine.startMusic(config.localMusicFilename);
    setIsMusicPlaying(started);
    setTimeout(() => {
      scrollToSection('story');
    }, 120);
  };

  const handleToggleMusic = async () => {
    const playing = await soundEngine.toggleMusic(config.localMusicFilename);
    setIsMusicPlaying(playing);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleToggleSfx = (enabled: boolean) => {
    setSfxEnabled(enabled);
    soundEngine.setSfxEnabled(enabled);
  };

  const handleSaveConfig = (updated: AnniversaryConfig) => {
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_ANNIVERSARY_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0608] text-[#FAF6F0] relative selection:bg-[#7A1C32] selection:text-[#FAF6F0]">
      {/* Subtle Ambient Background Particle Canvas */}
      <ParticleCanvas density={26} />

      {/* Top Bar Contract: 3 Zones separated by gap-8 (Brand wordmark | 5 concise single-line nav links | 1 primary CTA) */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-4 bg-[#0B0608]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="font-serif-editorial text-xl font-bold tracking-tight text-[#FAF6F0] whitespace-nowrap shrink-0"
        >
          365 Days of Us
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#C4B2B8]"
        >
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('story');
            }}
            className="hover:text-[#FAF6F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Our Story
          </a>
          <a
            href="#memories"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('memories');
            }}
            className="hover:text-[#FAF6F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#notes"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('notes');
            }}
            className="hover:text-[#FAF6F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Love Notes
          </a>
          <a
            href="#letter"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('letter');
            }}
            className="hover:text-[#FAF6F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Our Letter
          </a>
          <a
            href="#timeline"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('timeline');
            }}
            className="hover:text-[#FAF6F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Timeline
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action on Desktop + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('surprise')}
            className="hidden md:inline-flex px-4 py-2 text-xs font-medium text-[#FAF6F0] bg-[#7A1C32] hover:bg-[#91223C] rounded-lg border border-[#D4AF37]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Final Surprise
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg bg-[#1C0A11] text-[#FAF6F0] border border-[#D4AF37]/30 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Responsive Navigation Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden fixed inset-x-0 top-[65px] z-40 bg-[#14070C]/98 border-b border-[#D4AF37]/30 px-6 py-6 shadow-2xl space-y-3"
        >
          {[
            { id: 'home', label: 'Home' },
            { id: 'story', label: 'Our Story' },
            { id: 'memories', label: 'Memories' },
            { id: 'notes', label: 'Love Notes' },
            { id: 'letter', label: 'Our Letter' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'surprise', label: 'Final Surprise' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="block py-2.5 text-base font-medium text-[#FAF6F0] hover:text-[#E8D3A8] border-b border-[#D4AF37]/15"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setCustomizerOpen(true);
              }}
              className="w-full py-3 rounded-lg bg-[#7A1C32] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 cursor-pointer"
            >
              Personalize Names &amp; Letter
            </button>
          </div>
        </nav>
      )}

      {/* Custom 404 / 500 Error Page Preview Mode (Verifiable Requirement #19) */}
      {errorPreview !== 'none' ? (
        <main className="relative z-10 min-h-[80vh] flex items-center justify-center px-6 py-24">
          <div className="max-w-xl w-full rounded-2xl bg-[#1A0B10] border border-[#D4AF37]/40 p-10 text-center shadow-2xl">
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-2">
              {errorPreview === '404' ? 'HTTP 404 · PAGE NOT FOUND' : 'HTTP 500 · SERVER ERROR'}
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#FAF6F0] mb-4">
              {errorPreview === '404'
                ? 'This Memory Page Wandered Off'
                : 'A Momentary Pause in Our Story'}
            </h1>
            <p className="text-sm text-[#C4B2B8] leading-relaxed mb-8">
              {errorPreview === '404'
                ? 'Even if a link leads somewhere unexpected, every path in our story always brings us back home to each other.'
                : 'Something unexpected happened while loading this page, but our love story continues without interruption.'}
            </p>
            <button
              type="button"
              onClick={() => setErrorPreview('none')}
              className="px-6 py-3 rounded-xl bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 cursor-pointer"
            >
              Return to Anniversary Home
            </button>
          </div>
        </main>
      ) : (
        /* Main Connected Anniversary Experience */
        <main className="relative z-10">
          {/* Page 1: Cinematic Welcome Screen */}
          <WelcomeHero
            config={config}
            isOpened={isExperienceOpened}
            onOpenSurprise={handleOpenSurprise}
            isMusicPlaying={isMusicPlaying}
            isMuted={isMuted}
            onToggleMusic={handleToggleMusic}
            onToggleMute={handleToggleMute}
          />

          {/* Experience Toolbar below Hero for Personalization & Audio Control */}
          <div className="bg-[#16080D] border-y border-[#D4AF37]/25 px-6 py-3.5">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#E8D3A8] font-mono-tabular">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  CELEBRATING {config.yourName} + {config.partnerName} · {config.anniversaryDisplayDate}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleMusic}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#240D15] hover:bg-[#34131E] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {isMusicPlaying ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Pause Music</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-[#C4B2B8]" />
                      <span>Play Music</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCustomizerOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Personalize Names &amp; Letter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Page 2: Our Love Story */}
          <LoveStorySection
            config={config}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />

          {/* Page 3: Floating Memory Gallery */}
          <MemoryGallerySection config={config} />

          {/* Page 4: Animated Flowers and Love Notes */}
          <FlowersAndNotesSection config={config} />

          {/* Page 5: Our Anniversary Letter */}
          <AnniversaryLetterSection
            config={config}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />

          {/* Page 6: Our First Year Timeline */}
          <TimelineSection config={config} />

          {/* Page 7: Cinematic Anniversary Video & Animated Memory Reel */}
          <VideoAndReelSection config={config} />

          {/* Page 8: Interactive Surprise Buttons */}
          <SurpriseButtonsSection
            config={config}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            onBackToBeginning={() => scrollToSection('home')}
          />

          {/* Page 9: The Final Anniversary Reveal */}
          <FinalRevealSection
            config={config}
            onReturnToMainStory={() => scrollToSection('story')}
          />
        </main>
      )}

      {/* Quiet Editorial Footer */}
      <footer className="relative z-10 bg-[#080406] border-t border-[#D4AF37]/20 px-6 py-10 text-xs text-[#C4B2B8]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono-tabular">
            <span>{config.yourName} + {config.partnerName}</span>
            <span aria-hidden="true">·</span>
            <span>First Anniversary</span>
            <span aria-hidden="true">·</span>
            <span>{config.anniversaryDisplayDate}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setCustomizerOpen(true)}
              className="hover:text-[#FAF6F0] underline underline-offset-4 cursor-pointer"
            >
              Customize Content
            </button>
            <button
              type="button"
              onClick={() => setErrorPreview('404')}
              className="hover:text-[#FAF6F0] underline underline-offset-4 cursor-pointer"
            >
              Preview 404 Page
            </button>
            <button
              type="button"
              onClick={() => setErrorPreview('500')}
              className="hover:text-[#FAF6F0] underline underline-offset-4 cursor-pointer"
            >
              Preview 500 Page
            </button>
          </div>
        </div>
      </footer>

      {/* Visible Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#7A1C32] hover:bg-[#91223C] text-[#FAF6F0] border border-[#D4AF37]/50 shadow-xl transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Personalization Drawer */}
      <PersonalizeDrawer
        isOpen={customizerOpen}
        config={config}
        onClose={() => setCustomizerOpen(false)}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
        sfxEnabled={sfxEnabled}
        onToggleSfx={handleToggleSfx}
      />
    </div>
  );
}

export default App;
