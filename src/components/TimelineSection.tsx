import React from 'react';
import { Sparkles, Heart, Compass, Gem, Crown } from 'lucide-react';
import { AnniversaryConfig } from '../data/anniversaryConfig';
import { RomanticArtFrame } from './RomanticArtFrame';

interface TimelineSectionProps {
  config: AnniversaryConfig;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ config }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#E8D3A8]" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-[#E8D3A8]" />;
      case 'Gem':
        return <Gem className="w-4 h-4 text-[#E8D3A8]" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-[#E8D3A8]" />;
      default:
        return <Heart className="w-4 h-4 text-[#E8D3A8]" />;
    }
  };

  const themes = ['coffee', 'lanterns', 'botanical', 'rings', 'candlelight'];

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="relative py-24 px-6 bg-[#0E0609] text-[#FAF6F0] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-3">
            <span>OUR FIRST YEAR TIMELINE</span>
            <span aria-hidden="true">·</span>
            <span>MILESTONES OF US</span>
          </div>
          <h2
            id="timeline-heading"
            className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {config.timelineHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#C4B2B8] max-w-2xl mx-auto leading-relaxed">
            Each milestone marks a step in our journey toward celebrating our first wedding anniversary on {config.anniversaryDisplayDate}.
          </p>
        </div>

        {/* Vertical Timeline with Connecting Golden Line */}
        <div className="relative">
          {/* Center / Left Line */}
          <div
            aria-hidden="true"
            className="absolute left-5 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D98A9C]/50 to-[#D4AF37]/60 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {config.timelineMilestones.map((milestone, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center pl-14 md:pl-0"
                >
                  {/* Glowing Timeline Marker */}
                  <div
                    aria-hidden="true"
                    className="absolute left-1 md:left-1/2 top-6 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-10 w-9 h-9 rounded-full bg-[#240D15] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg"
                  >
                    {renderIcon(milestone.iconName)}
                  </div>

                  {/* Card Column */}
                  <div
                    className={`md:col-span-5 ${
                      isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-8 md:text-left'
                    }`}
                  >
                    <div className="rounded-2xl bg-[#1A0B11] border border-[#D4AF37]/25 p-6 shadow-xl">
                      <div
                        className={`flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#E8D3A8] mb-2 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span>{milestone.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#D98A9C]">{milestone.category}</span>
                      </div>

                      <h3 className="font-serif-editorial text-2xl font-semibold text-[#FAF6F0] mb-2">
                        {milestone.title}
                      </h3>

                      <p className="text-sm text-[#C4B2B8] leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {milestone.photoFilename && (
                        <RomanticArtFrame
                          theme={themes[idx % themes.length]}
                          src={milestone.photoFilename}
                          alt={milestone.title}
                          className="aspect-[16/9] rounded-xl border border-[#D4AF37]/25"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
