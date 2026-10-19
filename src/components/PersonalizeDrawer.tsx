import React, { useState } from 'react';
import { X, RotateCcw, Check, Volume2 } from 'lucide-react';
import { AnniversaryConfig, DEFAULT_ANNIVERSARY_CONFIG } from '../data/anniversaryConfig';
import { validatePersonalizationInput } from '../utils/anniversaryLogic';

interface PersonalizeDrawerProps {
  isOpen: boolean;
  config: AnniversaryConfig;
  onClose: () => void;
  onSaveConfig: (updated: AnniversaryConfig) => void;
  onResetConfig: () => void;
  sfxEnabled: boolean;
  onToggleSfx: (enabled: boolean) => void;
}

export const PersonalizeDrawer: React.FC<PersonalizeDrawerProps> = ({
  isOpen,
  config,
  onClose,
  onSaveConfig,
  onResetConfig,
  sfxEnabled,
  onToggleSfx,
}) => {
  const [yourName, setYourName] = useState(config.yourName);
  const [partnerName, setPartnerName] = useState(config.partnerName);
  const [anniversaryDisplayDate, setAnniversaryDisplayDate] = useState(config.anniversaryDisplayDate);
  const [heroSubtitle, setHeroSubtitle] = useState(config.heroSubtitle);
  const [letterText, setLetterText] = useState(config.letterParagraphs.join('\n\n'));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePersonalizationInput({
      yourName,
      partnerName,
      anniversaryDateLabel: anniversaryDisplayDate,
    });

    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please fill in all required fields.');
      return;
    }

    setErrorMsg(null);
    const paragraphs = letterText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    onSaveConfig({
      ...config,
      yourName: yourName.trim(),
      partnerName: partnerName.trim(),
      anniversaryDisplayDate: anniversaryDisplayDate.trim(),
      heroSubtitle: heroSubtitle.trim() || DEFAULT_ANNIVERSARY_CONFIG.heroSubtitle,
      letterParagraphs: paragraphs.length > 0 ? paragraphs : DEFAULT_ANNIVERSARY_CONFIG.letterParagraphs,
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleRestoreDefaults = () => {
    setYourName(DEFAULT_ANNIVERSARY_CONFIG.yourName);
    setPartnerName(DEFAULT_ANNIVERSARY_CONFIG.partnerName);
    setAnniversaryDisplayDate(DEFAULT_ANNIVERSARY_CONFIG.anniversaryDisplayDate);
    setHeroSubtitle(DEFAULT_ANNIVERSARY_CONFIG.heroSubtitle);
    setLetterText(DEFAULT_ANNIVERSARY_CONFIG.letterParagraphs.join('\n\n'));
    setErrorMsg(null);
    onResetConfig();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Personalize Anniversary Names and Content"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#16080D] text-[#FAF6F0] border-l border-[#D4AF37]/35 h-full overflow-y-auto p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4 mb-6">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8]">
              PERSONALIZATION SYSTEM
            </p>
            <h2 className="font-serif-editorial text-2xl font-semibold text-[#FAF6F0]">
              Customize Names, Letter &amp; Sound
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close personalization drawer"
            className="p-2 rounded-lg bg-[#260E16] hover:bg-[#3A1421] text-[#FAF6F0] border border-[#D4AF37]/30 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-[#4A1220] border border-[#F4D3DC]/40 text-xs text-[#FAF6F0]"
            >
              {errorMsg}
            </div>
          )}

          {savedNotice && (
            <div
              role="status"
              className="p-3.5 rounded-lg bg-[#1F3A28] border border-[#88B083]/50 text-xs text-[#FAF6F0] flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#88B083]" />
              <span>Personalization saved across all anniversary sections!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="input-your-name" className="block text-xs font-medium text-[#E8D3A8] mb-1.5">
                Your Name
              </label>
              <input
                id="input-your-name"
                type="text"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0508] border border-[#D4AF37]/35 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label htmlFor="input-partner-name" className="block text-xs font-medium text-[#E8D3A8] mb-1.5">
                Her Name (Partner&apos;s Name)
              </label>
              <input
                id="input-partner-name"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0508] border border-[#D4AF37]/35 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-anniv-date" className="block text-xs font-medium text-[#E8D3A8] mb-1.5">
              Anniversary Display Date
            </label>
            <input
              id="input-anniv-date"
              type="text"
              value={anniversaryDisplayDate}
              onChange={(e) => setAnniversaryDisplayDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0508] border border-[#D4AF37]/35 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label htmlFor="input-hero-subtitle" className="block text-xs font-medium text-[#E8D3A8] mb-1.5">
              Opening Scene Subtitle
            </label>
            <input
              id="input-hero-subtitle"
              type="text"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0508] border border-[#D4AF37]/35 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label htmlFor="input-letter-text" className="block text-xs font-medium text-[#E8D3A8] mb-1.5">
              Personal Anniversary Letter (Separate paragraphs with a blank line)
            </label>
            <textarea
              id="input-letter-text"
              rows={6}
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0508] border border-[#D4AF37]/35 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37] leading-relaxed"
            />
          </div>

          {/* Sound Effects Toggle (Muted by default until enabled, per Section 13) */}
          <div className="p-4 rounded-xl bg-[#1F0B13] border border-[#D4AF37]/25 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-[#E8D3A8] shrink-0" />
              <div>
                <div className="text-xs font-medium text-[#FAF6F0]">
                  Interactive Sound Effects (Envelope, Bouquet, Celebration)
                </div>
                <div className="text-[11px] text-[#C4B2B8]">
                  Muted by default until enabled, per audio design settings.
                </div>
              </div>
            </div>
            <input
              id="toggle-sfx"
              type="checkbox"
              aria-label="Enable interactive sound effects"
              checked={sfxEnabled}
              onChange={(e) => onToggleSfx(e.target.checked)}
              className="w-4 h-4 accent-[#7A1C32] cursor-pointer"
            />
          </div>

          <div className="pt-4 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#240D15] hover:bg-[#34131E] text-xs font-medium text-[#C4B2B8] hover:text-[#FAF6F0] border border-[#D4AF37]/25 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/50 shadow-md cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Personalization</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
