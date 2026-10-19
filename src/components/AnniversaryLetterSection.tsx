import React, { useState } from 'react';
import { Mail, Download, RotateCcw, Heart } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { formatLetterForDownload } from '../utils/anniversaryLogic';
import { soundEngine } from '../utils/soundEngine';

interface AnniversaryLetterSectionProps {
  config: AnniversaryConfig;
  onOpenCustomizer: () => void;
}

export const AnniversaryLetterSection: React.FC<AnniversaryLetterSectionProps> = ({
  config,
  onOpenCustomizer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [readCount, setReadCount] = useState(0);

  const handleOpenLetter = () => {
    setIsOpen(true);
    setReadCount((c) => c + 1);
    soundEngine.playSoundEffect('envelope');
  };

  const handleReadAgain = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
      setReadCount((c) => c + 1);
      soundEngine.playSoundEffect('envelope');
    }, 220);
  };

  const handleDownloadLetter = () => {
    const textContent = formatLetterForDownload(
      config.partnerName,
      config.yourName,
      config.anniversaryDisplayDate,
      config.letterParagraphs
    );
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `first-anniversary-letter-october-20.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="letter"
      aria-labelledby="letter-heading"
      className="relative py-24 px-6 bg-[#FAF6F0] text-[#1F1216] border-t border-[#D4AF37]/25"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#7A1C32] mb-3">
            <span>DIGITAL ANNIVERSARY LETTER</span>
            <span aria-hidden="true">·</span>
            <span>{config.anniversaryDisplayDate}</span>
          </div>
          <h2
            id="letter-heading"
            className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#1F1216] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {config.letterTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#695057] max-w-xl mx-auto">
            A personal letter written for {config.partnerName}. Open the wax-sealed envelope below to read or download your keepsake.
          </p>
        </div>

        {/* Closed Envelope View */}
        {!isOpen ? (
          <div className="max-w-xl mx-auto rounded-2xl bg-[#1A0B10] text-[#FAF6F0] border border-[#D4AF37]/40 p-10 sm:p-14 text-center shadow-2xl relative overflow-hidden">
            {/* Envelope Flap SVG */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#2C1019] border border-[#D4AF37]/50 flex items-center justify-center shadow-inner">
              <Mail className="w-10 h-10 text-[#E8D3A8]" />
            </div>

            <p className="font-mono-tabular text-xs uppercase tracking-widest text-[#E8D3A8] mb-2">
              FOR {config.partnerName} · FROM {config.yourName}
            </p>
            <h3 className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FAF6F0] mb-8">
              Sealed for Our First Anniversary on {config.anniversaryDisplayDate}
            </h3>

            <button
              type="button"
              onClick={handleOpenLetter}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#7A1C32] hover:bg-[#91223C] text-[#FAF6F0] font-medium text-sm tracking-wide border border-[#D4AF37]/50 shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>OPEN MY LETTER 💌</span>
            </button>
          </div>
        ) : (
          /* Opened Letter Paper View */
          <div
            key={readCount}
            data-testid="opened-letter-paper"
            className="rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 p-8 sm:p-14 shadow-2xl relative transition-all duration-500"
          >
            {/* Subtle Floating Hearts Header */}
            <div className="flex items-center justify-between border-b border-[#1F1216]/10 pb-6 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#7A1C32] uppercase tracking-wider">
                <span>OCTOBER 20 ANNIVERSARY KEEPSAKE</span>
                <span aria-hidden="true">·</span>
                <span>YEAR ONE</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#7A1C32]">
                <Heart className="w-4 h-4 fill-[#7A1C32]" />
                <Heart className="w-3.5 h-3.5 fill-[#D98A9C] text-[#D98A9C]" />
              </div>
            </div>

            {/* Letter Body */}
            <div className="font-serif-editorial text-xl sm:text-2xl text-[#1F1216] space-y-6 leading-relaxed">
              <p className="font-semibold text-2xl sm:text-3xl text-[#7A1C32]">
                {config.letterGreeting}
              </p>

              {config.letterParagraphs.map((para, index) => (
                <p key={index} className="text-[#2B181E]">
                  {para}
                </p>
              ))}

              <div className="pt-6 border-t border-[#1F1216]/10">
                <p className="italic text-[#695057] mb-1">{config.letterSignOff}</p>
                <p className="font-semibold text-2xl text-[#7A1C32]">
                  {config.yourName} ❤️
                </p>
              </div>
            </div>

            {/* Action Controls: Read Again, Download Letter, Edit Letter */}
            <div className="mt-10 pt-6 border-t border-[#1F1216]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleReadAgain}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F3ECE3] hover:bg-[#E6DDD0] text-[#1F1216] text-xs font-medium border border-[#1F1216]/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Read Again</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadLetter}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-[#FAF6F0] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Letter (.txt)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenCustomizer}
                className="text-xs font-medium text-[#7A1C32] underline underline-offset-4 hover:text-[#3A0D18] cursor-pointer"
              >
                Edit letter text
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
