# Our First Anniversary — An Interactive Digital Love Story

## 1. Project Introduction
**Our First Anniversary — An Interactive Digital Love Story** is an intimate, cinematic, interactive digital celebration created for a couple's first wedding anniversary on **October 20**. Designed as a deeply personal love-marriage keepsake rather than a generic wedding invitation, it guides your partner through 9 interactive scenes—from a starry midnight welcome screen and 7 story chapters to a floating memory gallery, blooming virtual rose bouquet, wax-sealed anniversary letter, interactive year-one timeline, memory reel, playful surprise buttons, and a final anniversary celebration reveal.

It requires **zero database setup** and **zero paid external services**.

---

## 2. Features
1. **Page 1 — Cinematic Welcome Screen**: Displays `"365 DAYS OF US"`, `"One year ago, our forever began..."`, customizable names (`[YOUR NAME] + [HER NAME]`), `OCTOBER 20`, smart date logic (never displays a countdown if October 20 has already passed; instead celebrates total days together), visible sound/mute controls, and the `"OPEN YOUR SURPRISE 💌"` button.
2. **Page 2 — Our Love Story**: 7 customizable chapters (*The Beginning*, *The Moment We Became Us*, *Our Favorite Memories*, *The Little Things I Love About You*, *The Day We Promised Forever*, *One Year of Togetherness*, *The Beginning of Many More Years*) with clearly labeled placeholders and graceful layouts with or without photos.
3. **Page 3 — Floating Memory Gallery**: Gentle floating photo frames on desktop, touch-friendly grid on mobile, click-to-open accessible lightbox with Next/Previous controls, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), captions, dates, and resilient SVG artwork fallbacks when personal photos are not yet added.
4. **Page 4 — Animated Flowers & Love Notes**: 5 expandable love-note cards plus the `"Send Me a Bouquet 🌹"` interactive SVG rose bouquet reveal with replay button.
5. **Page 5 — Our Anniversary Letter**: Interactive wax-sealed envelope (`"OPEN MY LETTER 💌"`), full editable anniversary letter template, `"Read Again"` button, and client-side `"Download Letter (.txt)"` generator.
6. **Page 6 — Our First Year Timeline**: 5 configurable milestone categories with animated markers and connecting lines.
7. **Page 7 — Cinematic Anniversary Video & Memory Reel**: Supports **Mode A (Personal MP4 Video)** when `static/videos/our-anniversary.mp4` is supplied, and automatically runs **Mode B (Animated Memory Reel)** with Ken Burns slow zoom and crossfades when no MP4 is present.
8. **Page 8 — Interactive Surprise Buttons**: Working handlers for `"MAKE A WISH ✨"`, `"SEND A HUG 🤗"`, `"UNLOCK A SECRET 💖"`, `"ONE MORE MEMORY 📸"`, `"PLAY OUR SONG 🎵"`, and `"BACK TO THE BEGINNING"`.
9. **Page 9 — The Final Anniversary Reveal**: Displays `"One Year Down, Forever to Go."`, `"Happy First Anniversary, My Love ❤️"`, and the `"CELEBRATE OUR LOVE ❤️"` button with floral bloom animation and replay control.
10. **Live Personalization Drawer**: In-app `"Personalize Names & Letter"` drawer to customize names, dates, and the love letter right in the browser, backed by central configuration files (`content/anniversary_data.py` and `src/data/anniversaryConfig.ts`).

---

## 3. Technology Stack
* **Python Backend**: Python 3, Flask 3, Jinja2 templates, Gunicorn WSGI server (for production deployment), `pytest` / `unittest`.
* **Frontend & Live Preview**: HTML5, Modern CSS3 / Tailwind CSS, Vanilla ES6+ JavaScript (`static/js/*.js`) & TypeScript/React modular components (`src/`), HTML5 Canvas API for lightweight particle systems, Web Audio API for local romantic melody synthesis, Google Fonts (*Cormorant Garamond*, *Plus Jakarta Sans*, *JetBrains Mono*).

---

## 4. Project Folder Structure
```text
anniversary-love-story/
├── app.py                          # Flask application & route definitions
├── config.py                       # Environment-variable configuration
├── requirements.txt                # Python dependencies (Flask, Gunicorn, pytest)
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignore rules
├── README.md                       # Complete documentation
├── content/
│   └── anniversary_data.py         # Single Python personalization config file
├── templates/
│   ├── base.html                   # Master Jinja2 layout & navigation
│   ├── index.html                  # Main connected 9-scene experience
│   ├── story.html                  # Dedicated Love Story route (/story)
│   ├── memories.html               # Dedicated Gallery route (/memories)
│   ├── letter.html                 # Dedicated Letter route (/letter)
│   ├── timeline.html               # Dedicated Timeline route (/timeline)
│   ├── surprise.html               # Dedicated Final Surprise route (/surprise)
│   ├── 404.html                    # Custom 404 Not Found error page
│   └── 500.html                    # Custom 500 Server Error page
├── static/
│   ├── css/
│   │   ├── style.css               # Core romantic design system & variables
│   │   ├── animations.css          # Keyframes & prefers-reduced-motion rules
│   │   └── responsive.css          # Mobile & tablet media queries
│   ├── js/
│   │   ├── main.js                 # Navigation, welcome transition, scroll-to-top
│   │   ├── gallery.js              # Lightbox modal & keyboard navigation
│   │   ├── animations.js           # Canvas star/petal particles
│   │   ├── interactions.js         # Love notes, bouquet, letter, surprise buttons
│   │   └── music.js                # Audio controller & Web Audio fallback
│   ├── images/
│   │   ├── photos/                 # Place personal photos here (memory-01.jpg, etc.)
│   │   ├── flowers/                # Optional floral assets
│   │   └── backgrounds/            # Optional background textures
│   ├── videos/                     # Place optional our-anniversary.mp4 here
│   └── audio/                      # Place optional our-song.mp3 here
├── tests/
│   └── test_app.py                 # Automated Flask route & date logic tests
└── src/                            # Interactive Web Preview & TypeScript modules
    ├── data/anniversaryConfig.ts   # Central TypeScript personalization config
    ├── utils/anniversaryLogic.ts   # Pure date & letter formatting logic
    └── components/                 # Modular UI scenes (Pages 1 to 9)
```

---

## 5. Prerequisites
* **Python 3.10+** (for running the Flask backend locally or deploying to Render/Railway/PythonAnywhere)
* **Node.js 20+** (optional, if running the Vite TypeScript live preview on port 3000)
* **Git** (for version control and GitHub deployment)

---

## 6. Installation Instructions for Windows
Open **PowerShell** or **Command Prompt** in the project directory:
```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

---

## 7. Installation Instructions for macOS / Linux
Open **Terminal** in the project directory:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 8. Virtual Environment Setup
Always activate your virtual environment before installing packages or starting Flask:
* **Windows**: `.\venv\Scripts\activate`
* **macOS/Linux**: `source venv/bin/activate`
To deactivate when finished, run `deactivate`.

---

## 9. How to Install Dependencies
With your virtual environment activated:
```bash
pip install -r requirements.txt
```
*(For the live port 3000 preview environment: run `npm install`.)*

---

## 10. How to Run the Flask Application
*(Note: The Flask development server is intended for local development only, not production.)*
```bash
export FLASK_DEBUG=1
python3 app.py
```
Then open `http://localhost:5000` in your browser.
*(In the AI Studio preview container on port 3000, `npm run dev` serves the interactive experience at `http://localhost:3000`.)*

---

## 11. How to Customize the Names
Open `content/anniversary_data.py` (and `src/data/anniversaryConfig.ts` if using the port 3000 preview) and edit:
```python
"your_name": "Aarav",       # Replace [YOUR NAME]
"partner_name": "Meera",    # Replace [HER NAME]
```
You can also click **"Personalize Names & Letter"** in the top toolbar of the web app to customize names interactively in your browser.

---

## 12. How to Edit the Anniversary Letter
Open `content/anniversary_data.py` and edit the `"letter"` dictionary:
```python
"letter": {
    "heading": "A Letter to My Favorite Person",
    "greeting": "My dearest love,",
    "paragraphs": [
        "Write your first personal paragraph here...",
        "Write your second personal paragraph here...",
    ],
    "sign_off": "Forever yours,",
}
```

---

## 13. How to Add Photographs
1. Copy your personal `.jpg`, `.png`, or `.webp` photographs into `static/images/photos/` (and `public/static/images/photos/` if using Vite).
2. Name them `memory-01.jpg` through `memory-06.jpg` (or update the filenames in `content/anniversary_data.py`).
3. If any photo file is absent, the website will never crash or show a broken image icon—it automatically renders a bespoke romantic SVG illustration.

---

## 14. How to Add Captions and Dates
In `content/anniversary_data.py`, locate `"gallery_photos"` and update each entry:
```python
{
    "filename": "images/photos/memory-01.jpg",
    "caption": "Our First Coffee Together in Indiranagar",
    "date": "November 14, 2024",
    "description": "The rainy afternoon we talked for four hours without noticing the time.",
    "theme": "coffee",
}
```

---

## 15. How to Add an MP3 File
1. Place an MP3 file that you own or are authorized to use into `static/audio/our-song.mp3`.
2. Verify `"local_music_filename": "audio/our-song.mp3"` in `content/anniversary_data.py`.
3. Music never autoplays on page load; it starts smoothly after clicking **"OPEN YOUR SURPRISE 💌"** or **"PLAY OUR SONG 🎵"**.

---

## 16. How to Add an MP4 File
1. Place your personal anniversary MP4 video into `static/videos/our-anniversary.mp4`.
2. When `our-anniversary.mp4` exists, **Mode A (Personal Video Player)** is enabled automatically with play/pause and volume controls.
3. If no MP4 file is supplied, **Mode B (Animated Memory Reel)** runs automatically using your configured gallery photographs.

---

## 17. How to Replace the Sample Content
Every placeholder in `content/anniversary_data.py` and `src/data/anniversaryConfig.ts` is marked with square brackets such as `[YOUR NAME]`, `[HER NAME]`, or `[Editable Story Placeholder: ...]`. Search for `[` in your editor to replace all sample placeholders in minutes.

---

## 18. How to Run Automated Tests
Run the unit and route test suites using either Node's native test runner or Python's unittest/pytest:
```bash
# Run frontend logic unit tests (Node 22+)
node --test src/utils/anniversaryLogic.test.ts

# Run Flask backend route & date tests
python3 -m unittest tests/test_app.py
```

---

## 19. How to Upload the Project to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Our First Anniversary digital love story"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
*Note: Never commit `.env` files or private keys. Large video files (>50 MB) should be compressed with HandBrake before committing to GitHub.*

---

## 20. How to Deploy the Application (Render / Railway / PythonAnywhere)
The Flask development server (`python app.py`) is for local development only. For production, use **Gunicorn**:

### Deploying to Render (Beginner-Friendly)
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) connected to your GitHub repo.
3. Set **Build Command**: `pip install -r requirements.txt`
4. Set **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
5. Add Environment Variable: `SECRET_KEY` = *(generate a random string)*, `FLASK_DEBUG` = `0`.
6. Click **Deploy**. Note that free-tier hosting on Render spins down after 15 minutes of inactivity, so the first visit after idle may take ~30 seconds to wake up.
7. Once deployed, open the public `https://your-anniversary-site.onrender.com` URL and share the link with your partner via WhatsApp, iMessage, or a QR code inside a physical anniversary card.

---

## 21. Common Errors and Their Solutions
* **Port already in use**: Change `PORT=5001` in `.env` or stop the existing process.
* **Photos not updating**: Hard-refresh your browser (`Ctrl+F5` or `Cmd+Shift+R`) to clear cached static assets.
* **Audio doesn't play immediately**: Modern browsers block audio until the user clicks a button. Click `"OPEN YOUR SURPRISE 💌"` or `"Play Music"` first.

---

## 22. How to Update the Website After Deployment
Edit `content/anniversary_data.py` locally, test your changes, and run:
```bash
git add .
git commit -m "Update anniversary memories and letter"
git push
```
Your hosting service will automatically rebuild and publish the updated site within 1–2 minutes.

---

## 23. Security and Privacy Considerations
* Do not hard-code secret keys in `config.py` or `app.py`; use environment variables (`SECRET_KEY`).
* Keep `FLASK_DEBUG=0` in production so stack traces are never exposed.
* The `"UNLOCK A SECRET 💖"` button is a playful romantic interaction, not cryptographic security—do not store sensitive passwords or financial data in static files.
