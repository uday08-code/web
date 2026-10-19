export interface StoryChapter {
  id: string;
  chapterNumber: string;
  title: string;
  milestoneDate: string;
  paragraph: string;
  photoFilename?: string;
  artworkTheme: 'beginning' | 'us' | 'memories' | 'little-things' | 'forever' | 'one-year' | 'future';
}

export interface GalleryPhoto {
  id: string;
  filename: string;
  caption: string;
  date: string;
  description: string;
  artworkTheme: 'coffee' | 'lanterns' | 'rings' | 'coast' | 'candlelight' | 'botanical';
  aspect: 'portrait' | 'landscape' | 'square';
  rotationDeg: number;
}

export interface LoveNote {
  id: string;
  shortNote: string;
  fullMessage: string;
  category: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  photoFilename?: string;
  iconName: 'Sparkles' | 'Heart' | 'Compass' | 'Gem' | 'Crown';
}

export interface AnniversaryConfig {
  yourName: string;
  partnerName: string;
  anniversaryDisplayDate: string;
  anniversaryIsoDate: string;
  originalMilestoneIsoDate: string;
  heroTitle: string;
  heroSubtitle: string;
  localMusicFilename: string;
  optionalVideoFilename: string;
  letterTitle: string;
  letterGreeting: string;
  letterParagraphs: string[];
  letterSignOff: string;
  storyHeading: string;
  storyChapters: StoryChapter[];
  galleryHeading: string;
  galleryPhotos: GalleryPhoto[];
  loveNotesHeading: string;
  loveNotes: LoveNote[];
  bouquetMessage: string;
  timelineHeading: string;
  timelineMilestones: TimelineMilestone[];
  videoSectionHeading: string;
  wishes: string[];
  hugMessage: string;
  secretPasscodeHint: string;
  secretMessage: string;
  finalRevealTitle: string;
  finalRevealSubtitle: string;
  finalClosingMessage: string;
}

/**
 * SINGLE CENTRAL PERSONALIZATION CONFIGURATION
 * Edit the values below (or use the in-app "Customize Names & Content" drawer)
 * to personalize every section of the website without searching through multiple files.
 * Note: No personal events, dates, locations, or real photographs have been invented.
 * Clearly labeled placeholders are provided for personal customization.
 */
export const DEFAULT_ANNIVERSARY_CONFIG: AnniversaryConfig = {
  yourName: '[YOUR NAME]',
  partnerName: '[HER NAME]',
  anniversaryDisplayDate: 'OCTOBER 20',
  anniversaryIsoDate: '2026-10-20T00:00:00',
  originalMilestoneIsoDate: '2025-10-20T00:00:00',
  heroTitle: '365 DAYS OF US',
  heroSubtitle: 'One year ago, our forever began...',
  localMusicFilename: '/static/audio/our-song.mp3',
  optionalVideoFilename: '/static/videos/our-anniversary.mp4',
  letterTitle: 'A Letter to My Favorite Person',
  letterGreeting: 'My love,',
  letterParagraphs: [
    'Happy first anniversary!',
    'Looking back at this beautiful chapter of our lives, I feel grateful for the memories we have created and the moments we have shared.',
    'Thank you for being part of my journey, for the happiness you bring into my life, and for making ordinary moments feel special.',
    'This is only the beginning of our story. I hope we continue growing together, supporting each other, laughing together, and creating memories we will cherish forever.',
    'No website can fully express everything I feel, but I wanted to create this little surprise just for you.',
    'Happy first anniversary, my love.',
  ],
  letterSignOff: 'Forever yours,',
  storyHeading: 'Every Love Story Is Special. Ours Is My Favorite.',
  storyChapters: [
    {
      id: 'chapter-1',
      chapterNumber: '01',
      title: 'The Beginning',
      milestoneDate: '[Insert Date or Season — e.g., The Day We Met]',
      paragraph:
        '[Editable Story Placeholder: Replace this paragraph in config with the real story of how your paths first crossed, your first conversation, and the quiet spark that started everything.]',
      photoFilename: '/static/images/photos/chapter-1.jpg',
      artworkTheme: 'beginning',
    },
    {
      id: 'chapter-2',
      chapterNumber: '02',
      title: 'The Moment We Became Us',
      milestoneDate: '[Insert Milestone Date — When We Knew]',
      paragraph:
        '[Editable Story Placeholder: Describe the turning point when friendship and affection deepened into an unmistakable bond—when being together began to feel like coming home.]',
      photoFilename: '/static/images/photos/chapter-2.jpg',
      artworkTheme: 'us',
    },
    {
      id: 'chapter-3',
      chapterNumber: '03',
      title: 'Our Favorite Memories',
      milestoneDate: '[Insert Memorable Season or Trip Placeholder]',
      paragraph:
        '[Editable Story Placeholder: Share a few cherished moments you both hold dear—whether quiet late-night talks, shared laughter, or unforgettable adventures side by side.]',
      photoFilename: '/static/images/photos/chapter-3.jpg',
      artworkTheme: 'memories',
    },
    {
      id: 'chapter-4',
      chapterNumber: '04',
      title: 'The Little Things I Love About You',
      milestoneDate: 'Every Single Day',
      paragraph:
        '[Editable Story Placeholder: Write about the small, everyday gestures—the warmth of her smile, her kindness, the way she listens, and the peace she brings to every room.]',
      artworkTheme: 'little-things',
    },
    {
      id: 'chapter-5',
      chapterNumber: '05',
      title: 'The Day We Promised Forever',
      milestoneDate: 'October 20 · Wedding Day Milestone',
      paragraph:
        '[Editable Story Placeholder: Reflect on October 20—the day you chose each other for life, surrounded by love, promising to walk through every season hand in hand.]',
      photoFilename: '/static/images/photos/chapter-5.jpg',
      artworkTheme: 'forever',
    },
    {
      id: 'chapter-6',
      chapterNumber: '06',
      title: 'One Year of Togetherness',
      milestoneDate: '365 Days Married',
      paragraph:
        '[Editable Story Placeholder: Celebrate your first full year of marriage—the lessons learned, the home you have built in each other, and how your love has grown deeper every day.]',
      photoFilename: '/static/images/photos/chapter-6.jpg',
      artworkTheme: 'one-year',
    },
    {
      id: 'chapter-7',
      chapterNumber: '07',
      title: 'The Beginning of Many More Years',
      milestoneDate: 'October 20 & Beyond',
      paragraph:
        '[Editable Story Placeholder: Look ahead to the future—all the dreams yet to be fulfilled, the places yet to be seen, and a lifetime of anniversaries still waiting to be celebrated.]',
      artworkTheme: 'future',
    },
  ],
  galleryHeading: 'A Thousand Memories, One Favorite Person.',
  galleryPhotos: [
    {
      id: 'photo-1',
      filename: '/static/images/photos/memory-01.jpg',
      caption: '[Sample Photo 01 — Replace with your personal photo caption]',
      date: '[Insert Memory Date 01]',
      description:
        'Place your personal photograph at static/images/photos/memory-01.jpg. Until supplied, this frame renders a bespoke romantic illustration.',
      artworkTheme: 'coffee',
      aspect: 'portrait',
      rotationDeg: -2,
    },
    {
      id: 'photo-2',
      filename: '/static/images/photos/memory-02.jpg',
      caption: '[Sample Photo 02 — Replace with a favorite shared moment]',
      date: '[Insert Memory Date 02]',
      description:
        'Place your personal photograph at static/images/photos/memory-02.jpg. Customize the caption and date in content/anniversary_data.py or src/data/anniversaryConfig.ts.',
      artworkTheme: 'lanterns',
      aspect: 'landscape',
      rotationDeg: 1.5,
    },
    {
      id: 'photo-3',
      filename: '/static/images/photos/memory-03.jpg',
      caption: '[Sample Photo 03 — The Day We Promised Forever]',
      date: 'October 20',
      description:
        'Place your wedding or commitment photograph at static/images/photos/memory-03.jpg to showcase your October 20 celebration.',
      artworkTheme: 'rings',
      aspect: 'portrait',
      rotationDeg: -1.2,
    },
    {
      id: 'photo-4',
      filename: '/static/images/photos/memory-04.jpg',
      caption: '[Sample Photo 04 — Replace with a cherished getaway or walk]',
      date: '[Insert Memory Date 04]',
      description:
        'Place your personal photograph at static/images/photos/memory-04.jpg. Supports portrait, landscape, or square aspect ratios smoothly.',
      artworkTheme: 'coast',
      aspect: 'landscape',
      rotationDeg: 2,
    },
    {
      id: 'photo-5',
      filename: '/static/images/photos/memory-05.jpg',
      caption: '[Sample Photo 05 — Quiet evenings and warm laughter]',
      date: '[Insert Memory Date 05]',
      description:
        'Place your personal photograph at static/images/photos/memory-05.jpg. Every gallery item supports keyboard navigation and lightbox inspection.',
      artworkTheme: 'candlelight',
      aspect: 'square',
      rotationDeg: -1.8,
    },
    {
      id: 'photo-6',
      filename: '/static/images/photos/memory-06.jpg',
      caption: '[Sample Photo 06 — Celebrating 365 days of love]',
      date: 'October 20 · First Anniversary',
      description:
        'Place your first anniversary portrait at static/images/photos/memory-06.jpg to complete your memory gallery.',
      artworkTheme: 'botanical',
      aspect: 'portrait',
      rotationDeg: 1.2,
    },
  ],
  loveNotesHeading: 'Little Things I Want You to Know.',
  loveNotes: [
    {
      id: 'note-1',
      shortNote: 'You make ordinary days feel special.',
      fullMessage:
        'Even the simplest routine—a quiet morning, a walk in the evening, or talking about our day—becomes my favorite moment simply because I am sharing it with you.',
      category: 'Everyday Magic',
    },
    {
      id: 'note-2',
      shortNote: 'Your happiness means the world to me.',
      fullMessage:
        'Seeing you smile and knowing you feel loved, supported, and cherished is the greatest privilege of my life. I will always do my best to protect your peace.',
      category: 'My Promise',
    },
    {
      id: 'note-3',
      shortNote: 'Thank you for being part of my life.',
      fullMessage:
        'Thank you for your patience, your warmth, your honesty, and the gentle way you care for us. You have made my world infinitely brighter this past year.',
      category: 'Gratitude',
    },
    {
      id: 'note-4',
      shortNote: 'My favorite memories are the ones we share.',
      fullMessage:
        'Every photograph, every inside joke, and every milestone we have crossed together is a treasure I carry with me. You are the heart of every good memory.',
      category: 'Our Memories',
    },
    {
      id: 'note-5',
      shortNote: 'I look forward to creating many more memories with you.',
      fullMessage:
        'Year one was only the prologue. Whatever chapters come next, I know they will be extraordinary because we are writing them together.',
      category: 'Our Future',
    },
  ],
  bouquetMessage:
    'A virtual bouquet of crimson and blush roses that will never fade—just like my love and gratitude for you on our first anniversary.',
  timelineHeading: '365 Days. Countless Memories. One Beautiful Journey.',
  timelineMilestones: [
    {
      id: 'ms-1',
      date: '[Insert Date Placeholder · Beginning]',
      category: 'When our story began',
      title: 'The First Chapter of Us',
      description:
        '[Editable Placeholder: Add the date and story of when your journey first began. Replace this placeholder in the configuration file.]',
      photoFilename: '/static/images/photos/memory-01.jpg',
      iconName: 'Sparkles',
    },
    {
      id: 'ms-2',
      date: '[Insert Date Placeholder · Shared Memory]',
      category: 'A favorite shared memory',
      title: 'An Unforgettable Day Together',
      description:
        '[Editable Placeholder: Describe a favorite shared memory, trip, or quiet evening that brought you closer together.]',
      photoFilename: '/static/images/photos/memory-02.jpg',
      iconName: 'Compass',
    },
    {
      id: 'ms-3',
      date: '[Insert Date Placeholder · Milestone]',
      category: 'An important relationship milestone',
      title: 'Knowing Forever Was With You',
      description:
        '[Editable Placeholder: Note an important turning point or milestone when you both knew your future belonged together.]',
      iconName: 'Heart',
    },
    {
      id: 'ms-4',
      date: 'October 20 (One Year Ago)',
      category: 'Our wedding or commitment date',
      title: 'The Day We Promised Forever',
      description:
        '[Editable Placeholder: Celebrate the day you married on October 20 and began your lifelong adventure side by side.]',
      photoFilename: '/static/images/photos/memory-03.jpg',
      iconName: 'Gem',
    },
    {
      id: 'ms-5',
      date: 'October 20 (First Anniversary)',
      category: 'Our first anniversary',
      title: '365 Days of Marriage & Love',
      description:
        'Celebrating one complete year of marriage, partnership, and unwavering love—and looking ahead to forever.',
      photoFilename: '/static/images/photos/memory-06.jpg',
      iconName: 'Crown',
    },
  ],
  videoSectionHeading: 'Our Story, Through Our Memories',
  wishes: [
    'May our second year bring even deeper laughter, quiet peaceful mornings, and new adventures hand in hand.',
    'I wish for a lifetime where you always feel cherished, understood, and endlessly loved every single day.',
    'May we always keep our curiosity, our kindness toward each other, and the warmth that makes us who we are.',
    'Here is to growing older together while keeping our hearts as joyful as the day we promised forever.',
    'May every October 20 remind us how lucky we are to have found our home in each other.',
  ],
  hugMessage:
    'Consider this a warm, tight embrace across the screen—holding you close and reminding you that you are deeply loved today and always.',
  secretPasscodeHint: 'Tap the golden lock or enter "1020" (October 20) to unlock your secret note',
  secretMessage:
    'Out of everything I have ever done in my life, choosing to walk through this world with you on October 20 is the best decision I have ever made. You are my greatest blessing.',
  finalRevealTitle: 'One Year Down, Forever to Go.',
  finalRevealSubtitle: 'Happy First Anniversary, My Love ❤️',
  finalClosingMessage:
    'Thank you for 365 unforgettable days of marriage, laughter, grace, and love. Here is to our first anniversary on October 20—and to every year that follows.',
};
