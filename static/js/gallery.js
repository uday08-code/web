// Gallery Lightbox and Memory Reel Slideshow Controller
(function () {
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const lightbox = document.getElementById('gallery-lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const imgEl = document.getElementById('lightbox-img');
  const fallbackEl = document.getElementById('lightbox-fallback');
  const fallbackTitleEl = document.getElementById('lightbox-fallback-title');
  const captionEl = document.getElementById('lightbox-caption');
  const dateEl = document.getElementById('lightbox-date');
  const descEl = document.getElementById('lightbox-desc');
  let activeIdx = 0;

  function openAt(index) {
    if (!lightbox || cards.length === 0) return;
    activeIdx = (index + cards.length) % cards.length;
    const card = cards[activeIdx];
    const src = card.dataset.src || '';
    const caption = card.dataset.caption || '';

    if (captionEl) captionEl.textContent = caption;
    if (dateEl) dateEl.textContent = card.dataset.date || '';
    if (descEl) descEl.textContent = card.dataset.description || '';
    if (fallbackTitleEl) fallbackTitleEl.textContent = caption;

    if (imgEl && fallbackEl) {
      fallbackEl.style.display = 'none';
      imgEl.style.display = 'block';
      imgEl.src = src;
      imgEl.alt = caption;
    }

    lightbox.hidden = false;
  }

  function closeLightbox() {
    if (lightbox) lightbox.hidden = true;
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => openAt(i));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (prevBtn) prevBtn.addEventListener('click', () => openAt(activeIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => openAt(activeIdx + 1));

  window.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openAt(activeIdx - 1);
    if (e.key === 'ArrowRight') openAt(activeIdx + 1);
  });

  // Animated Memory Reel Controls (Mode B)
  const slides = Array.from(document.querySelectorAll('[data-reel-slide]'));
  const reelPrev = document.getElementById('reel-prev-btn');
  const reelNext = document.getElementById('reel-next-btn');
  const reelToggle = document.getElementById('reel-toggle-btn');
  let slideIdx = 0;
  let playingReel = true;

  function showSlide(i) {
    if (slides.length === 0) return;
    slideIdx = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === slideIdx));
  }

  if (slides.length > 0) {
    setInterval(() => {
      if (playingReel) showSlide(slideIdx + 1);
    }, 5000);
  }
  if (reelPrev) reelPrev.addEventListener('click', () => showSlide(slideIdx - 1));
  if (reelNext) reelNext.addEventListener('click', () => showSlide(slideIdx + 1));
  if (reelToggle) {
    reelToggle.addEventListener('click', () => {
      playingReel = !playingReel;
      reelToggle.textContent = playingReel ? 'Pause Reel' : 'Play Reel';
    });
  }
})();
