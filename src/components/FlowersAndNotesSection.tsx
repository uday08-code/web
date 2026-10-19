import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, X } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { soundEngine } from '../utils/soundEngine';

interface FlowersAndNotesSectionProps {
  config: AnniversaryConfig;
}

export const FlowersAndNotesSection: React.FC<FlowersAndNotesSectionProps> = ({ config }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(config.loveNotes[0]?.id || null);
  const [bouquetRevealed, setBouquetRevealed] = useState(false);
  const [bouquetReplayKey, setBouquetReplayKey] = useState(0);

  const handleToggleNote = (id: string) => {
    setActiveNoteId((prev) => (prev === id ? null : id));
    soundEngine.playSoundEffect('surprise');
  };

  const handleSendBouquet = () => {
    setBouquetRevealed(true);
    setBouquetReplayKey((prev) => prev + 1);
    soundEngine.playSoundEffect('bouquet');
  };

  const handleReplayBouquet = () => {
    setBouquetReplayKey((prev) => prev + 1);
    soundEngine.playSoundEffect('bouquet');
  };

  return (
    <section
      id="notes"
      aria-labelledby="love-notes-heading"
      className="relative py-24 px-6 bg-[#14080C] text-[#FAF6F0] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-3">
            <span>LOVE NOTES &amp; BLOOMING BOUQUET</span>
            <span aria-hidden="true">·</span>
            <span>INTERACTIVE KEEPSAKES</span>
          </div>
          <h2
            id="love-notes-heading"
            className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {config.loveNotesHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#C4B2B8] max-w-2xl mx-auto leading-relaxed">
            Select any love note card below to unfold the personal message inside, or send a blooming anniversary rose bouquet.
          </p>
        </div>

        {/* Interactive Love Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {config.loveNotes.map((note, idx) => {
            const isExpanded = activeNoteId === note.id;

            return (
              <div
                key={note.id}
                className={`rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#260E17] border-[#D4AF37] shadow-xl'
                    : 'bg-[#1A0B11] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#E8D3A8] mb-3">
                    <span>NOTE 0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.category}</span>
                  </div>

                  <h3 className="font-serif-editorial text-2xl font-semibold text-[#FAF6F0] mb-4 leading-snug">
                    &ldquo;{note.shortNote}&rdquo;
                  </h3>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#D4AF37]/25 text-sm text-[#F4D3DC] leading-relaxed animate-fadeIn">
                      <p className="mb-3">{note.fullMessage}</p>
                      <div className="flex items-center gap-2 text-xs text-[#E8D3A8] font-mono-tabular">
                        <Heart className="w-3.5 h-3.5 fill-[#D98A9C] text-[#D98A9C]" />
                        <span>With all my love, {config.yourName}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggleNote(note.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-[#32121D] hover:bg-[#461828] text-[#FAF6F0] border border-[#D4AF37]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isExpanded ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Close Note</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#E8D3A8]" />
                        <span>Read Personal Note</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Virtual Bouquet Reveal Card */}
        <div className="rounded-2xl bg-gradient-to-b from-[#1F0B13] to-[#13070B] border border-[#D4AF37]/35 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-3">
            <span>VIRTUAL FLORAL ARRANGEMENT</span>
            <span aria-hidden="true">·</span>
            <span>OCTOBER 20 BOUQUET</span>
          </div>

          <h3 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#FAF6F0] mb-4">
            A Blooming Bouquet of Roses for {config.partnerName}
          </h3>

          <p className="text-sm sm:text-base text-[#C4B2B8] max-w-xl mx-auto mb-8 leading-relaxed">
            Click the button below to bloom a hand-crafted SVG bouquet of crimson, blush, and champagne roses with falling petals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleSendBouquet}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#7A1C32] hover:bg-[#91223C] text-[#FAF6F0] text-sm font-medium border border-[#D4AF37]/50 shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Send Me a Bouquet 🌹</span>
            </button>

            {bouquetRevealed && (
              <button
                type="button"
                onClick={handleReplayBouquet}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#240D15] hover:bg-[#33131E] text-[#E8D3A8] text-xs font-medium border border-[#D4AF37]/35 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Bouquet Animation</span>
              </button>
            )}
          </div>

          {/* Animated SVG Rose Bouquet Reveal */}
          {bouquetRevealed && (
            <div
              key={bouquetReplayKey}
              data-testid="bouquet-display"
              className="mt-10 pt-8 border-t border-[#D4AF37]/25 animate-bloom"
            >
              <div className="max-w-md mx-auto">
                <svg
                  viewBox="0 0 360 280"
                  className="w-full h-64 mx-auto overflow-visible"
                  role="img"
                  aria-label="Animated blooming bouquet of crimson and blush roses"
                >
                  {/* Soft Golden Aura */}
                  <circle cx="180" cy="130" r="105" fill="#D4AF37" fillOpacity="0.12" />
                  <circle cx="180" cy="130" r="75" fill="#D98A9C" fillOpacity="0.15" />

                  {/* Stems & Foliage */}
                  <path
                    d="M180,255 L180,115 M180,245 L125,130 M180,245 L235,130 M180,250 L150,105 M180,250 L210,105"
                    stroke="#5B8C5A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Leaves */}
                  <ellipse cx="135" cy="185" rx="18" ry="8" transform="rotate(-30 135 185)" fill="#4A7849" />
                  <ellipse cx="225" cy="185" rx="18" ry="8" transform="rotate(30 225 185)" fill="#4A7849" />

                  {/* Champagne Satin Ribbon Wrap */}
                  <path
                    d="M150,210 L210,210 L195,260 L165,260 Z"
                    fill="#E8D3A8"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M155,215 Q180,228 205,215"
                    fill="none"
                    stroke="#7A1C32"
                    strokeWidth="3"
                  />

                  {/* Rose Blooms */}
                  {[
                    { cx: 180, cy: 95, r: 28, outer: '#7A1C32', inner: '#D98A9C', core: '#FAF6F0' },
                    { cx: 135, cy: 120, r: 24, outer: '#9E2845', inner: '#F4D3DC', core: '#E8D3A8' },
                    { cx: 225, cy: 120, r: 24, outer: '#9E2845', inner: '#F4D3DC', core: '#E8D3A8' },
                    { cx: 155, cy: 145, r: 22, outer: '#D98A9C', inner: '#FAF6F0', core: '#D4AF37' },
                    { cx: 205, cy: 145, r: 22, outer: '#7A1C32', inner: '#D98A9C', core: '#F4D3DC' },
                  ].map((rose, i) => (
                    <g key={i}>
                      <circle cx={rose.cx} cy={rose.cy} r={rose.r} fill={rose.outer} />
                      <circle cx={rose.cx - 3} cy={rose.cy - 2} r={rose.r * 0.68} fill={rose.inner} />
                      <circle cx={rose.cx + 2} cy={rose.cy + 2} r={rose.r * 0.35} fill={rose.core} />
                    </g>
                  ))}

                  {/* Floating Petals & Sparkles */}
                  <circle cx="95" cy="85" r="5" fill="#D98A9C" />
                  <circle cx="265" cy="90" r="6" fill="#7A1C32" />
                  <circle cx="110" cy="55" r="3.5" fill="#E8D3A8" />
                  <circle cx="250" cy="50" r="4" fill="#E8D3A8" />
                </svg>

                <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#F4D3DC] mt-4 leading-relaxed">
                  &ldquo;{config.bouquetMessage}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
