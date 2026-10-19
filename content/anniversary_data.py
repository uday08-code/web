"""
Single, clearly documented personalization file for the First Anniversary website.
Edit the values in ANNIVERSARY_DATA below to customize names, dates, chapters,
gallery photographs, love notes, the anniversary letter, and surprise messages.

No database is required. If any optional photograph, audio, or video file is missing,
the templates and frontend automatically render graceful romantic SVG illustrations.
"""

from datetime import datetime, date

ANNIVERSARY_DATA = {
    "your_name": "UDAY GOWDA N S",
    "partner_name": "CHINMAYEE K R",
    "anniversary_display_date": "OCTOBER 20",
    "anniversary_month": 10,
    "anniversary_day": 20,
    "anniversary_year": 2026,
    "original_milestone_date": "2025-10-20",
    "hero_title": "365 DAYS OF US",
    "hero_subtitle": "One year ago, our forever began...",
    "local_music_filename": "audio/our-song.mp3",
    "optional_video_filename": "videos/our-anniversary.mp4",
    "theme": {
        "bg_midnight": "#0B0608",
        "accent_burgundy": "#7A1C32",
        "accent_rose": "#D98A9C",
        "accent_blush": "#F4D3DC",
        "accent_gold": "#D4AF37",
        "bg_ivory": "#FAF6F0",
    },
    "letter": {
        "heading": "A Letter to My Favorite Person",
        "greeting": "My love,",
        "paragraphs": [
            "Happy first anniversary!",
            "Looking back at this beautiful chapter of our lives, I feel grateful for the memories we have created and the moments we have shared.",
            "Thank you for being part of my journey, for the happiness you bring into my life, and for making ordinary moments feel special.",
            "This is only the beginning of our story. I hope we continue growing together, supporting each other, laughing together, and creating memories we will cherish forever.",
            "No website can fully express everything I feel, but I wanted to create this little surprise just for you.",
            "Happy first anniversary, my love.",
        ],
        "sign_off": "Forever yours,",
    },
    "story_heading": "Every Love Story Is Special. Ours Is My Favorite.",
    "story_chapters": [
        {
            "number": "01",
            "title": "The Beginning",
            "date": "09-MAY-2025",
            "paragraph": "First time we took a photo together, that's the most happiest day to me and I knew I wanted to spend the rest of my life with this person.",
            "photo": "images/photos/chapter-1.jpg",
            "theme": "beginning",
        },
        {
            "number": "02",
            "title": "The Moment We Became Us",
            "date": "18-OCT-2025",
            "paragraph": "We travel together, we laugh together, we cry together,we love together, we are together. and on this day I tryd to kiss on your hand but rejected😅",
            "photo": "images/photos/chapter-2.jpg",
            "theme": "us",
        },
        {
            "number": "03",
            "title": "Our Favorite Memories",
            "date": "26-NOV-2026",
            "paragraph": "Your looking beautiful in that photo, I love you so much, I want to spend the rest of my life with you.",
            "photo": "images/photos/chapter-3.jpg",
            "theme": "memories",
        },
        {
            "number": "04",
            "title": "The Little Things I Love About You",
            "date": "Every Single Day",
            "paragraph": "Chinmaye only with you where I feel the love of emotional attachment..ect and I need this for my entire life ❤️🫂",
            "photo": "images/photos/chapter-7.jpg",
            "theme": "little-things",
        },
        {
            "number": "05",
            "title": "The Day We Promised Forever",
            "date": "20-OCT-2025 · Partial Wedding Day Milestone",
            "paragraph": " This is the day we promised to be together forever, and I am so grateful to have you by my side every day.",
            "photo": "images/photos/chapter-5.jpg",
            "theme": "forever",
        },
        {
            "number": "06",
            "title": "One Year of Togetherness",
            "date": "365 Days",
            "paragraph": " Chinamyee finaly we completed one year of togetherness, and I am so grateful to have you by my side every day.",
            "photo": "images/photos/chapter-6.jpg",
            "theme": "one-year",
        },
        {
            "number": "07",
            "title": "The Beginning of Many More Years",
            "date": "October 20 & Beyond",
            "paragraph": " I hope that we can continue to grow and love each other for many more years to come.",
            "photo": "images/photos/chapter-8.jpg",
            "theme": "future",
        },
    ],
    "gallery_heading": "A Thousand Memories, One Favorite Person.",
    "gallery_photos": [
        {
            "filename": "images/photos/memory-01.jpg",
            "caption": "Pre-Wedding shoot😅",
            "date": "27-NOV-2025",
            "description": "LOVE YOU FOREVER",
            "theme": "coffee",
        },
        {
            "filename": "images/photos/memory-02.jpg",
            "caption": "Graduation Day",
            "date": "11-JULY-2026",
            "description": "CUTE AND LOVELY",
            "theme": "lanterns",
        },
        {
            "filename": "images/photos/memory-03.jpg",
            "caption": "Trip",
            "date": "6-SEP-2025",
            "description": "Finally we get a photo in a final day of trip",
            "theme": "rings",
        },
        {
            "filename": "images/photos/memory-04.jpg",
            "caption": "Graduation Day",
            "date": "11-JULY-2026",
            "description": "We together for 1 year",
            "theme": "coast",
        },
        {
            "filename": "images/photos/memory-05.jpg",
            "caption": "Graduation Day",
            "date": "11-JULY-2026",
            "description": "Cutest jodi",
            "theme": "candlelight",
        },
        {
            "filename": "images/photos/memory-06.jpg",
            "caption": "Madikeri Festival",
            "date": "19-MAR-2026",
            "description": "Favorite Pic for me.",
            "theme": "botanical",
        },
    ],
    "love_notes_heading": "Little Things I Want You to Know.",
    "love_notes": [
        {
            "short": "You make ordinary days feel special.",
            "full": "Even the simplest routine—a quiet morning, a walk in the evening, or talking about our day—becomes my favorite moment simply because I am sharing it with you.",
            "category": "Everyday Magic",
        },
        {
            "short": "Your happiness means the world to me.",
            "full": "Seeing you smile and knowing you feel loved, supported, and cherished is the greatest privilege of my life. I will always do my best to protect your peace.",
            "category": "My Promise",
        },
        {
            "short": "Thank you for being part of my life.",
            "full": "Thank you for your patience, your warmth, your honesty, and the gentle way you care for us. You have made my world infinitely brighter this past year.",
            "category": "Gratitude",
        },
        {
            "short": "My favorite memories are the ones we share.",
            "full": "Every photograph, every inside joke, and every milestone we have crossed together is a treasure I carry with me. You are the heart of every good memory.",
            "category": "Our Memories",
        },
        {
            "short": "I look forward to creating many more memories with you.",
            "full": "Year one was only the prologue. Whatever chapters come next, I know they will be extraordinary because we are writing them together.",
            "category": "Our Future",
        },
    ],
    "bouquet_message": "A virtual bouquet of crimson and blush roses that will never fade—just like my love and gratitude for you on our first anniversary.",
    "timeline_heading": "365 Days. Countless Memories. One Beautiful Journey.",
    "timeline_milestones": [
        {
            "category": "When our story began",
            "title": "The First Chapter of Us",
            "description": "story of when your journey first began.",
            "photo": "images/photos/memory-01.jpg",
            "icon": "sparkles",
        },
        {
            "category": "A favorite shared memory",
            "title": "An Unforgettable Day Together",
            "description": "Manthralaya Trip that brought us closer together.]",
            "photo": "images/photos/memory-02.jpg",
            "icon": "compass",
        },
        {
            "category": "An important relationship milestone",
            "title": "Knowing Forever Was With You",
            "description": "turning point or milestone when you both knew your future belonged together.",
            "photo": None,
            "icon": "heart",
        },
        {
            "category": "Our commitment date",
            "title": "The Day We Promised Forever",
            "description": "Celebrate the day on October 20 and began your lifelong adventure side by side.",
            "photo": "images/photos/memory-03.jpg",
            "icon": "gem",
        },
        {
            "category": "Our first anniversary",
            "title": "365 Days of Love",
            "description": "Celebrating one complete year of love, partnership, and unwavering love—and looking ahead to forever.",
            "photo": "images/photos/memory-06.jpg",
            "icon": "crown",
        },
    ],
    "video_heading": "Our Story, Through Our Memories",
    "wishes": [
        "May our second year bring even deeper laughter, quiet peaceful mornings, and new adventures hand in hand.",
        "I wish for a lifetime where you always feel cherished, understood, and endlessly loved every single day.",
        "May we always keep our curiosity, our kindness toward each other, and the warmth that makes us who we are.",
        "Here is to growing older together while keeping our hearts as joyful as the day we promised forever.",
        "May every October 20 remind us how lucky we are to have found our home in each other.",
    ],
    "hug_message": "Consider this a warm, tight embrace across the screen—holding you close and reminding you that you are deeply loved today and always.",
    "secret_hint": "Tap the golden lock or enter '1020' (October 20) to unlock your secret note",
    "secret_message": "Out of everything I have ever done in my life, choosing to walk through this world with you on October 20 is the best decision I have ever made. You are my greatest blessing.",
    "final_reveal_title": "One Year Down, Forever to Go.",
    "final_reveal_subtitle": "Happy First Anniversary, My Love ❤️",
    "final_closing_message": "Thank you for 365 unforgettable days of marriage, laughter, grace, and love. Here is to our first anniversary on October 20—and to every year that follows.",
}


def compute_anniversary_badge(current_date: date | None = None) -> dict:
    """
    Computes whether to display a countdown to October 20 or a celebration message.
    IMPORTANT RULE: Never display a countdown to October 20 if the anniversary date has already passed.
    """
    today = current_date or date.today()
    target_date = date(
        ANNIVERSARY_DATA["anniversary_year"],
        ANNIVERSARY_DATA["anniversary_month"],
        ANNIVERSARY_DATA["anniversary_day"],
    )
    milestone_parts = [int(p) for p in ANNIVERSARY_DATA["original_milestone_date"].split("-")]
    milestone_date = date(milestone_parts[0], milestone_parts[1], milestone_parts[2])

    days_since_milestone = max(0, (today - milestone_date).days)
    days_until = (target_date - today).days

    if days_until > 0:
        return {
            "mode": "countdown",
            "days_until": days_until,
            "days_since_milestone": days_since_milestone,
            "badge_text": f"{days_until} {'Day' if days_until == 1 else 'Days'} Until October 20",
        }
    return {
        "mode": "celebration",
        "days_until": 0,
        "days_since_milestone": max(365, days_since_milestone),
        "badge_text": f"Celebrating Our First Anniversary · {max(365, days_since_milestone)} Days Together",
    }
