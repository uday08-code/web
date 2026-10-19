import React from 'react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { RomanticArtFrame } from './RomanticArtFrame';

interface LoveStorySectionProps {
  config: AnniversaryConfig;
  onOpenCustomizer: () => void;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({
  config,
  onOpenCustomizer,
}) => {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative py-24 px-6 bg-[#FAF6F0] text-[#1F1216] border-t border-[#D4AF37]/25"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#7A1C32] mb-3">
            <span>CHAPTERS OF US</span>
            <span aria-hidden="true">·</span>
            <span>OUR LOVE STORY</span>
          </div>
          <h2
            id="story-heading"
            className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#1F1216] tracking-tight mb-6"
            style={{ textWrap: 'balance' }}
          >
            {config.storyHeading}
          </h2>
          <p className="text-base text-[#695057] leading-relaxed max-w-2xl mx-auto">
            Seven chapters celebrating our journey from the very beginning to our first wedding anniversary on {config.anniversaryDisplayDate}.
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="text-xs font-medium text-[#7A1C32] underline underline-offset-4 hover:text-[#3A0D18] transition-colors cursor-pointer"
            >
              Personalize story chapters &amp; names
            </button>
          </div>
        </div>

        {/* 7 Editable Story Chapters */}
        <div className="space-y-16">
          {config.storyChapters.map((chapter, index) => {
            const hasPhoto = Boolean(chapter.photoFilename);
            const isEven = index % 2 === 0;

            return (
              <article
                key={chapter.id}
                className="rounded-2xl bg-[#F3ECE3] border border-[#1F1216]/10 p-6 sm:p-10 transition-all duration-300"
              >
                {hasPhoto ? (
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`lg:col-span-7 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#7A1C32] uppercase tracking-wider mb-3">
                        <span>Chapter {chapter.chapterNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{chapter.milestoneDate}</span>
                      </div>
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#1F1216] mb-4">
                        {chapter.chapterNumber}. {chapter.title}
                      </h3>
                      <p className="text-base text-[#3D262E] leading-relaxed">
                        {chapter.paragraph}
                      </p>
                    </div>

                    <div
                      className={`lg:col-span-5 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <RomanticArtFrame
                        theme={chapter.artworkTheme}
                        src={chapter.photoFilename}
                        alt={`${chapter.title} illustration or personal photograph`}
                        className="aspect-[4/3] rounded-xl border border-[#D4AF37]/30 shadow-md"
                      />
                    </div>
                  </div>
                ) : (
                  /* Chapters without photographs display with a centered editorial monograph layout */
                  <div className="max-w-3xl mx-auto text-center py-4">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular text-[#7A1C32] uppercase tracking-wider mb-3">
                      <span>Chapter {chapter.chapterNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>{chapter.milestoneDate}</span>
                    </div>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#1F1216] mb-4">
                      {chapter.chapterNumber}. {chapter.title}
                    </h3>
                    <p className="text-base text-[#3D262E] leading-relaxed">
                      {chapter.paragraph}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
