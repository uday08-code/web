import React from 'react';

interface RomanticArtFrameProps {
  theme: string;
  src?: string;
  alt: string;
  caption?: string;
  date?: string;
  className?: string;
}

export const RomanticArtFrame: React.FC<RomanticArtFrameProps> = ({
  theme,
  src,
  alt,
  caption,
  date,
  className = '',
}) => {
  const [verifiedImgSrc, setVerifiedImgSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    if (!src) {
      setVerifiedImgSrc(null);
      return;
    }
    // Check if the user has actually placed an image file in /static/images/photos/
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (active && res.ok && contentType.startsWith('image/')) {
          setVerifiedImgSrc(src);
        } else if (active) {
          setVerifiedImgSrc(null);
        }
      })
      .catch(() => {
        if (active) setVerifiedImgSrc(null);
      });
    return () => {
      active = false;
    };
  }, [src]);

  const showFallback = !verifiedImgSrc;

  const renderArtworkSvg = () => {
    switch (theme) {
      case 'coffee':
      case 'beginning':
        return (
          <svg viewBox="0 0 400 320" className="w-full h-full object-cover" aria-hidden="true">
            <defs>
              <linearGradient id="bg-coffee" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#261017" />
                <stop offset="50%" stopColor="#421824" />
                <stop offset="100%" stopColor="#17090E" />
              </linearGradient>
              <radialGradient id="glow-coffee" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#E8D3A8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#E8D3A8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="320" fill="url(#bg-coffee)" />
            <circle cx="200" cy="145" r="130" fill="url(#glow-coffee)" />
            {/* Sunbeam window lines */}
            <path d="M60,0 L170,320 M140,0 L250,320" stroke="#E8D3A8" strokeOpacity="0.08" strokeWidth="28" />
            {/* Table surface */}
            <ellipse cx="200" cy="235" rx="145" ry="38" fill="#1A0B10" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1" />
            {/* Two ceramic cups */}
            <g transform="translate(130, 175)">
              <ellipse cx="25" cy="40" rx="28" ry="8" fill="#D4AF37" fillOpacity="0.25" />
              <path d="M5,15 L45,15 L40,40 L10,40 Z" fill="#FAF6F0" fillOpacity="0.9" />
              <path d="M45,20 C55,20 55,34 42,35" fill="none" stroke="#FAF6F0" strokeWidth="3" />
              <path d="M20,5 Q25,-8 20,-18 M30,7 Q35,-6 28,-16" fill="none" stroke="#F4D3DC" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <g transform="translate(215, 170)">
              <ellipse cx="25" cy="45" rx="28" ry="8" fill="#D4AF37" fillOpacity="0.25" />
              <path d="M5,20 L45,20 L40,45 L10,45 Z" fill="#F4D3DC" fillOpacity="0.9" />
              <path d="M45,25 C55,25 55,39 42,40" fill="none" stroke="#F4D3DC" strokeWidth="3" />
              <path d="M20,10 Q15,-5 22,-15 M30,12 Q25,-3 32,-13" fill="none" stroke="#E8D3A8" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Rose stem on table */}
            <path d="M125,245 Q200,255 275,235" fill="none" stroke="#88B083" strokeOpacity="0.7" strokeWidth="2" />
            <circle cx="275" cy="235" r="10" fill="#B83352" />
            <circle cx="273" cy="233" r="6" fill="#F4D3DC" fillOpacity="0.6" />
          </svg>
        );
      case 'lanterns':
      case 'us':
        return (
          <svg viewBox="0 0 400 320" className="w-full h-full object-cover" aria-hidden="true">
            <defs>
              <linearGradient id="bg-lantern" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B0608" />
                <stop offset="60%" stopColor="#2A0E17" />
                <stop offset="100%" stopColor="#14070B" />
              </linearGradient>
            </defs>
            <rect width="400" height="320" fill="url(#bg-lantern)" />
            {/* String lights */}
            <path d="M0,55 Q200,115 400,45" fill="none" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1" />
            <path d="M0,105 Q210,165 400,95" fill="none" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1" />
            {/* Glowing lanterns */}
            {[75, 155, 240, 325].map((x, idx) => {
              const y = idx % 2 === 0 ? 78 : 90;
              return (
                <g key={x} transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="14" r="26" fill="#D4AF37" fillOpacity="0.18" />
                  <rect x="-9" y="0" width="18" height="26" rx="7" fill="#E8D3A8" fillOpacity="0.9" stroke="#D4AF37" strokeWidth="1" />
                </g>
              );
            })}
            {/* Romantic silhouette arch */}
            <path d="M110,320 L110,170 A90,90 0 0,1 290,170 L290,320" fill="none" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Floating heart */}
            <path d="M200,195 C200,182 180,174 180,190 C180,204 200,214 200,224 C200,214 220,204 220,190 C220,174 200,182 200,195 Z" fill="#D98A9C" fillOpacity="0.8" />
          </svg>
        );
      case 'rings':
      case 'forever':
        return (
          <svg viewBox="0 0 400 320" className="w-full h-full object-cover" aria-hidden="true">
            <defs>
              <radialGradient id="bg-rings" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#4A1222" />
                <stop offset="70%" stopColor="#1E080F" />
                <stop offset="100%" stopColor="#0D0407" />
              </radialGradient>
            </defs>
            <rect width="400" height="320" fill="url(#bg-rings)" />
            {/* Velvet petals background */}
            <circle cx="110" cy="95" r="24" fill="#7A1C32" fillOpacity="0.45" />
            <circle cx="305" cy="225" r="32" fill="#7A1C32" fillOpacity="0.4" />
            <circle cx="95" cy="230" r="18" fill="#D98A9C" fillOpacity="0.25" />
            {/* Two interlocking champagne gold wedding bands */}
            <circle cx="178" cy="160" r="44" fill="none" stroke="#E8D3A8" strokeWidth="6" />
            <circle cx="178" cy="160" r="44" fill="none" stroke="#FAF6F0" strokeWidth="1.5" strokeOpacity="0.7" />
            <circle cx="222" cy="160" r="44" fill="none" stroke="#D4AF37" strokeWidth="6" />
            <circle cx="222" cy="160" r="44" fill="none" stroke="#FAF6F0" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Diamond sparkle on left ring */}
            <polygon points="178,104 182,113 191,116 182,119 178,128 174,119 165,116 174,113" fill="#FAF6F0" />
          </svg>
        );
      case 'coast':
      case 'memories':
        return (
          <svg viewBox="0 0 400 320" className="w-full h-full object-cover" aria-hidden="true">
            <defs>
              <linearGradient id="bg-sunset" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#260E18" />
                <stop offset="45%" stopColor="#6E2338" />
                <stop offset="70%" stopColor="#D98A9C" />
                <stop offset="100%" stopColor="#1B0A12" />
              </linearGradient>
            </defs>
            <rect width="400" height="320" fill="url(#bg-sunset)" />
            {/* Setting sun */}
            <circle cx="200" cy="175" r="48" fill="#E8D3A8" fillOpacity="0.85" />
            <circle cx="200" cy="175" r="68" fill="#F4D3DC" fillOpacity="0.22" />
            {/* Ocean horizon & shimmer */}
            <rect x="0" y="195" width="400" height="125" fill="#180910" fillOpacity="0.85" />
            <line x1="0" y1="195" x2="400" y2="195" stroke="#E8D3A8" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="145" y1="210" x2="255" y2="210" stroke="#E8D3A8" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            <line x1="160" y1="224" x2="240" y2="224" stroke="#D98A9C" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
            <line x1="175" y1="238" x2="225" y2="238" stroke="#E8D3A8" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'candlelight':
      case 'one-year':
        return (
          <svg viewBox="0 0 400 320" className="w-full h-full object-cover" aria-hidden="true">
            <rect width="400" height="320" fill="#16080C" />
            <circle cx="165" cy="115" r="55" fill="#E8D3A8" fillOpacity="0.16" />
            <circle cx="235" cy="135" r="50" fill="#E8D3A8" fillOpacity="0.14" />
            {/* Tapered candles */}
            <rect x="159" y="130" width="12" height="110" rx="2" fill="#FAF6F0" />
            <path d="M165,105 C160,115 160,124 165,128 C170,124 170,115 165,105 Z" fill="#D4AF37" />
            <rect x="229" y="150" width="12" height="90" rx="2" fill="#FAF6F0" />
            <path d="M235,125 C230,135 230,144 235,148 C240,144 240,135 235,125 Z" fill="#D4AF37" />
            {/* Brass holders */}
            <path d="M148,240 L182,240 L174,252 L156,252 Z" fill="#D4AF37" />
            <path d="M218,240 L252,240 L244,252 L226,252 Z" fill="#D4AF37" />
            {/* Center rose bloom */}
            <circle cx="200" cy="238" r="18" fill="#7A1C32" />
            <circle cx="200" cy="238" r="11" fill="#B83352" />
            <circle cx="198" cy="236" r="5" fill="#F4D3DC" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 400 320" className="w-full h-full object-cover" aria-hidden="true">
            <defs>
              <linearGradient id="bg-botanical" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2D0C16" />
                <stop offset="100%" stopColor="#120609" />
              </linearGradient>
            </defs>
            <rect width="400" height="320" fill="url(#bg-botanical)" />
            <circle cx="200" cy="160" r="95" fill="none" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="200" cy="160" r="82" fill="none" stroke="#F4D3DC" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 5" />
            {/* Botanical rose emblem */}
            <g transform="translate(200, 155)">
              <circle cx="0" cy="0" r="28" fill="#7A1C32" />
              <circle cx="-6" cy="-4" r="19" fill="#9E2845" />
              <circle cx="5" cy="4" r="14" fill="#D98A9C" />
              <circle cx="0" cy="0" r="7" fill="#F4D3DC" />
              <path d="M0,28 L0,65 M0,45 L-18,35 M0,52 L18,40" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#1A0B10] ${className}`}>
      {!showFallback && verifiedImgSrc ? (
        <img
          src={verifiedImgSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setVerifiedImgSrc(null)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full relative flex flex-col justify-between">
          {renderArtworkSvg()}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          {(caption || date) && (
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none text-left">
              {date && (
                <p className="text-[11px] font-mono-tabular tracking-wider text-[#E8D3A8]/90 uppercase">
                  {date}
                </p>
              )}
              {caption && (
                <p className="text-xs text-[#FAF6F0]/90 font-serif-editorial italic line-clamp-1">
                  {caption}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
