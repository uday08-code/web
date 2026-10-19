import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { AnniversaryConfig, GalleryPhoto } from '../data/anniversaryConfig';
import { RomanticArtFrame } from './RomanticArtFrame';

interface MemoryGallerySectionProps {
  config: AnniversaryConfig;
}

export const MemoryGallerySection: React.FC<MemoryGallerySectionProps> = ({ config }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photos = config.galleryPhotos;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % photos.length;
    });
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  const activePhoto: GalleryPhoto | null =
    selectedIndex !== null && photos[selectedIndex] ? photos[selectedIndex] : null;

  return (
    <section
      id="memories"
      aria-labelledby="memories-heading"
      className="relative py-24 px-6 bg-[#0F070A] text-[#FAF6F0] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#E8D3A8] mb-3">
            <span>FLOATING MEMORY GALLERY</span>
            <span aria-hidden="true">·</span>
            <span>{photos.length} CONFIGURED FRAMES</span>
          </div>
          <h2
            id="memories-heading"
            className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {config.galleryHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#C4B2B8] max-w-2xl mx-auto leading-relaxed">
            Click any memory frame to open the full-screen lightbox. To display your own photographs, place image files in <code className="text-[#E8D3A8] font-mono-tabular">static/images/photos/</code> and update the filenames in <code className="text-[#E8D3A8] font-mono-tabular">content/anniversary_data.py</code>.
          </p>
        </div>

        {/* Responsive Grid on Mobile, Gentle Floating Frames on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => {
            const floatClass =
              index % 2 === 0
                ? 'lg:animate-float-slow'
                : 'lg:animate-float-reverse';

            return (
              <div
                key={photo.id}
                className={`${floatClass} transition-transform duration-300`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open memory ${index + 1}: ${photo.caption}`}
                  className="group w-full text-left rounded-2xl bg-[#1A0B10] border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4">
                    <RomanticArtFrame
                      theme={photo.artworkTheme}
                      src={photo.filename}
                      alt={photo.caption}
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-[#FAF6F0] opacity-80 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Unboxed Metadata Date + Filename */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#E8D3A8] mb-1.5">
                    <span>{photo.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate text-[#C4B2B8]">{photo.filename.split('/').pop()}</span>
                  </div>

                  {/* Caption */}
                  <h3 className="font-serif-editorial text-xl font-semibold text-[#FAF6F0] mb-1.5 group-hover:text-[#F4D3DC] transition-colors">
                    {photo.caption}
                  </h3>

                  {/* Optional Description */}
                  <p className="text-xs text-[#C4B2B8] line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Memory Photograph Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          onClick={handleClose}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl bg-[#180A0F] border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Controls */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E8D3A8]">
                <span>
                  MEMORY {selectedIndex + 1} OF {photos.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activePhoto.date}</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close lightbox"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A1019] hover:bg-[#3A1622] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Close (ESC)</span>
              </button>
            </div>

            {/* Large Artwork / Photograph View */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 mb-6 bg-[#0B0608]">
              <RomanticArtFrame
                theme={activePhoto.artworkTheme}
                src={activePhoto.filename}
                alt={activePhoto.caption}
                className="w-full h-full"
              />
            </div>

            {/* Caption & Navigation Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-editorial text-2xl font-semibold text-[#FAF6F0] mb-1">
                  {activePhoto.caption}
                </h3>
                <p className="text-sm text-[#C4B2B8] leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#260E16] hover:bg-[#3A1421] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photograph"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#7A1C32] hover:bg-[#91223C] text-xs font-medium text-[#FAF6F0] border border-[#D4AF37]/40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
