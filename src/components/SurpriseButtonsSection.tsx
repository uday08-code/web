import React, { useState } from 'react';
import { Sparkles, Heart, Lock, Unlock, Camera, Music, ArrowUpCircle, RotateCcw } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { selectNextItem } from '../utils/anniversaryLogic';
import { RomanticArtFrame } from './RomanticArtFrame';
import { soundEngine } from '../utils/soundEngine';

interface SurpriseButtonsSectionProps {
  config: AnniversaryConfig;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onBackToBeginning: () => void;
}

export const SurpriseButtonsSection: React.FC<SurpriseButtonsSectionProps> = ({
  config,
  isMusicPlaying,
  onToggleMusic,
  onBackToBeginning,
}) => {
  const [activePanel, setActivePanel] = useState<'wish' | 'hug' | 'secret' | 'memory' | 'song'>('wish');
  const [wishIndex, setWishIndex] = useState(0);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [hugCount, setHugCount] = useState(1);

  const handleMakeAWish = () => {
    const next = selectNextItem(config.wishes, wishIndex);
    setWishIndex(next.nextIndex);
    setActivePanel('wish');
    soundEngine.playSoundEffect('surprise');
  };

  const handleSendAHug = () => {
    setHugCount((c) => c + 1);
    setActivePanel('hug');
    soundEngine.playSoundEffect('surprise');
  };

  const handleUnlockSecretTab = () => {
    setActivePanel('secret');
    soundEngine.playSoundEffect('surprise');
  };

  const handleOneMoreMemory = () => {
    const next = selectNextItem(config.galleryPhotos, memoryIndex);
    setMemoryIndex(next.nextIndex);
    setActivePanel('memory');
    soundEngine.playSoundEffect('surprise');
  };

  const handlePlayOurSong = () => {
    onToggleMusic();
    setActivePanel('song');
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSecretUnlocked(true);
    soundEngine.playSoundEffect('celebration');
  };

  const currentWish = config.wishes[wishIndex] || config.wishes[0];
  const currentMemory = config.galleryPhotos[memoryIndex] || config.galleryPhotos[0];

  return (
    <section
      id="surprises"
      aria-labelledby="surprises-heading"
      className="relative py-24 px-6 bg-[#FAF6F0] text-[#1F1216] border-t border-[#D4AF37]/25"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#7A1C32] mb-3">
            <span>INTERACTIVE SURPRISE MOMENTS</span>
            <span aria-hidden="true">·</span>
            <span>SIX WORKING EXPERIENCES</span>
          </div>
          <h2
            id="surprises-heading"
            className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#1F1216] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Little Interactive Surprises for You
          </h2>
          <p className="text-sm sm:text-base text-[#695057] max-w-2xl mx-auto">
            Click any button below to make an anniversary wish, send a warm hug, unlock a playful secret, or revisit a random memory.
          </p>
        </div>

        {/* 6 Required Interactive Surprise Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <button
            type="button"
            onClick={handleMakeAWish}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activePanel === 'wish'
                ? 'bg-[#7A1C32] text-[#FAF6F0] border-[#D4AF37] shadow-md'
                : 'bg-[#F3ECE3] text-[#1F1216] border-[#1F1216]/15 hover:border-[#7A1C32]'
            }`}
          >
            <span className="font-medium text-sm whitespace-nowrap shrink-0">MAKE A WISH ✨</span>
            <Sparkles className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={handleSendAHug}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activePanel === 'hug'
                ? 'bg-[#7A1C32] text-[#FAF6F0] border-[#D4AF37] shadow-md'
                : 'bg-[#F3ECE3] text-[#1F1216] border-[#1F1216]/15 hover:border-[#7A1C32]'
            }`}
          >
            <span className="font-medium text-sm whitespace-nowrap shrink-0">SEND A HUG 🤗</span>
            <Heart className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={handleUnlockSecretTab}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activePanel === 'secret'
                ? 'bg-[#7A1C32] text-[#FAF6F0] border-[#D4AF37] shadow-md'
                : 'bg-[#F3ECE3] text-[#1F1216] border-[#1F1216]/15 hover:border-[#7A1C32]'
            }`}
          >
            <span className="font-medium text-sm whitespace-nowrap shrink-0">UNLOCK A SECRET 💖</span>
            {isSecretUnlocked ? <Unlock className="w-4 h-4 shrink-0" /> : <Lock className="w-4 h-4 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={handleOneMoreMemory}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activePanel === 'memory'
                ? 'bg-[#7A1C32] text-[#FAF6F0] border-[#D4AF37] shadow-md'
                : 'bg-[#F3ECE3] text-[#1F1216] border-[#1F1216]/15 hover:border-[#7A1C32]'
            }`}
          >
            <span className="font-medium text-sm whitespace-nowrap shrink-0">ONE MORE MEMORY 📸</span>
            <Camera className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={handlePlayOurSong}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activePanel === 'song'
                ? 'bg-[#7A1C32] text-[#FAF6F0] border-[#D4AF37] shadow-md'
                : 'bg-[#F3ECE3] text-[#1F1216] border-[#1F1216]/15 hover:border-[#7A1C32]'
            }`}
          >
            <span className="font-medium text-sm whitespace-nowrap shrink-0">
              PLAY OUR SONG 🎵
            </span>
            <Music className="w-4 h-4 shrink-0" />
          </button>

          <button
            type="button"
            onClick={onBackToBeginning}
            className="p-4 rounded-xl border border-[#1F1216]/15 bg-[#F3ECE3] hover:bg-[#E7DEC9] text-[#1F1216] text-left transition-all flex items-center justify-between cursor-pointer"
          >
            <span className="font-medium text-sm whitespace-nowrap shrink-0">
              BACK TO THE BEGINNING
            </span>
            <ArrowUpCircle className="w-4 h-4 text-[#7A1C32] shrink-0" />
          </button>
        </div>

        {/* Active Interactive Display Stage */}
        <div
          data-testid="surprise-stage"
          className="rounded-2xl bg-[#1A0B10] text-[#FAF6F0] border border-[#D4AF37]/40 p-8 sm:p-12 shadow-2xl"
        >
          {activePanel === 'wish' && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-[#E8D3A8] mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-mono-tabular uppercase tracking-widest">
                  ANNIVERSARY WISH #{wishIndex + 1} OF {config.wishes.length}
                </span>
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FAF6F0] mb-8 leading-relaxed">
                &ldquo;{currentWish}&rdquo;
              </p>
              <button
                type="button"
                onClick={handleMakeAWish}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reveal Another Wish</span>
              </button>
            </div>
          )}

          {activePanel === 'hug' && (
            <div key={hugCount} className="text-center max-w-2xl mx-auto">
              {/* Two illustrated hearts moving together */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-12 h-12 text-[#D98A9C] fill-[#D98A9C] translate-x-2 transition-transform duration-500" />
                <Heart className="w-12 h-12 text-[#7A1C32] fill-[#7A1C32] -translate-x-2 transition-transform duration-500" />
              </div>
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-2">
                WARM EMBRACE SENT · {hugCount} {hugCount === 1 ? 'HUG' : 'HUGS'} SHARED
              </p>
              <p className="font-serif-editorial text-2xl sm:text-3xl text-[#FAF6F0] mb-6 leading-relaxed">
                {config.hugMessage}
              </p>
              <button
                type="button"
                onClick={handleSendAHug}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 cursor-pointer"
              >
                <span>Send Another Hug 🤗</span>
              </button>
            </div>
          )}

          {activePanel === 'secret' && (
            <div className="text-center max-w-2xl mx-auto">
              {!isSecretUnlocked ? (
                <form onSubmit={handleUnlockSubmit} className="space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#2C1019] border border-[#D4AF37] flex items-center justify-center mb-3">
                    <Lock className="w-6 h-6 text-[#E8D3A8]" />
                  </div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#FAF6F0]">
                    A Playful Anniversary Secret
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4B2B8]">
                    {config.secretPasscodeHint}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                    <label htmlFor="secret-code-input" className="sr-only">
                      Anniversary date code
                    </label>
                    <input
                      id="secret-code-input"
                      type="text"
                      value={secretInput}
                      onChange={(e) => setSecretInput(e.target.value)}
                      placeholder="Enter 1020 or click Unlock"
                      className="w-full sm:w-48 px-4 py-2.5 rounded-lg bg-[#12060A] border border-[#D4AF37]/40 text-sm text-[#FAF6F0] text-center focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Unlock Secret Note 💖
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#2C1019] border border-[#D4AF37] flex items-center justify-center mb-4">
                    <Unlock className="w-6 h-6 text-[#E8D3A8]" />
                  </div>
                  <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-2">
                    SECRET MESSAGE UNLOCKED
                  </p>
                  <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FAF6F0] mb-6 leading-relaxed">
                    &ldquo;{config.secretMessage}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSecretUnlocked(false);
                      setSecretInput('');
                    }}
                    className="text-xs text-[#E8D3A8] underline underline-offset-4 cursor-pointer"
                  >
                    Lock Secret Again
                  </button>
                </div>
              )}
            </div>
          )}

          {activePanel === 'memory' && currentMemory && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6">
                <RomanticArtFrame
                  theme={currentMemory.artworkTheme}
                  src={currentMemory.filename}
                  alt={currentMemory.caption}
                  className="aspect-[4/3] rounded-xl border border-[#D4AF37]/35"
                />
              </div>
              <div className="md:col-span-6 text-left">
                <div className="text-xs font-mono-tabular text-[#E8D3A8] uppercase tracking-wider mb-2">
                  SPOTLIGHT MEMORY · {currentMemory.date}
                </div>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#FAF6F0] mb-3">
                  {currentMemory.caption}
                </h3>
                <p className="text-sm text-[#C4B2B8] leading-relaxed mb-6">
                  {currentMemory.description}
                </p>
                <button
                  type="button"
                  onClick={handleOneMoreMemory}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Show Another Memory</span>
                </button>
              </div>
            </div>
          )}

          {activePanel === 'song' && (
            <div className="text-center max-w-xl mx-auto">
              <Music className="w-10 h-10 text-[#E8D3A8] mx-auto mb-3" />
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-2">
                AUDIO PLAYBACK STATE · {isMusicPlaying ? 'CURRENTLY PLAYING' : 'PAUSED'}
              </p>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#FAF6F0] mb-3">
                {isMusicPlaying
                  ? 'Playing Our Romantic Anniversary Melody'
                  : 'Our Anniversary Melody Is Paused'}
              </h3>
              <p className="text-xs sm:text-sm text-[#C4B2B8] mb-6 leading-relaxed">
                Supports your personal local MP3 at{' '}
                <code className="text-[#E8D3A8] font-mono-tabular">{config.localMusicFilename}</code>{' '}
                with automatic fallback to our gentle Web Audio romantic piano box.
              </p>
              <button
                type="button"
                onClick={onToggleMusic}
                className="px-6 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 cursor-pointer"
              >
                {isMusicPlaying ? 'Pause Music' : 'Resume Music'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
