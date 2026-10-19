// Main Navigation, Welcome Transition, Music Controls, Back-to-Top, and 3-Field Personalizer
(function () {
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const muteToggleBtn = document.getElementById('mute-toggle-btn');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', () => {
      if (window.AnniversaryAudio && !window.AnniversaryAudio.isPlaying()) {
        window.AnniversaryAudio.toggle();
      }
      const storySection = document.getElementById('story');
      if (storySection) {
        storySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (musicToggleBtn && window.AnniversaryAudio) {
    musicToggleBtn.addEventListener('click', () => window.AnniversaryAudio.toggle());
  }

  if (muteToggleBtn && window.AnniversaryAudio) {
    muteToggleBtn.addEventListener('click', () => window.AnniversaryAudio.toggleMute());
  }

  if (mobileMenuToggle && primaryNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.hidden = window.scrollY < 400;
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3-Field Personalization Drawer (Your Name, Her Name, Anniversary Display Date)
  const STORAGE_KEY = 'flask_anniversary_personalization_v1';
  const drawer = document.getElementById('personalize-drawer');
  const openDrawerBtn = document.getElementById('open-customizer-btn');
  const closeDrawerBtn = document.getElementById('close-customizer-btn');
  const resetDrawerBtn = document.getElementById('reset-customizer-btn');
  const form = document.getElementById('personalize-form');
  const alertBox = document.getElementById('personalize-alert');

  const inputYourName = document.getElementById('field-your-name');
  const inputPartnerName = document.getElementById('field-partner-name');
  const inputAnnivDate = document.getElementById('field-anniv-date');
  const inputSubtitle = document.getElementById('field-hero-subtitle');

  function applyPersonalization(vals) {
    if (!vals) return;
    if (vals.yourName) {
      document.querySelectorAll('[data-bind-your-name]').forEach((el) => {
        el.textContent = vals.yourName;
      });
    }
    if (vals.partnerName) {
      document.querySelectorAll('[data-bind-partner-name]').forEach((el) => {
        el.textContent = vals.partnerName;
      });
    }
    if (vals.annivDate) {
      document.querySelectorAll('[data-bind-date]').forEach((el) => {
        el.textContent = vals.annivDate;
      });
    }
    if (vals.subtitle) {
      document.querySelectorAll('[data-bind-subtitle]').forEach((el) => {
        el.textContent = vals.subtitle;
      });
    }
    if (vals.yourName && vals.partnerName) {
      document.title = `Our First Anniversary — ${vals.yourName} + ${vals.partnerName}`;
    }
  }

  // Load saved personalization on page load
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      applyPersonalization(parsed);
      if (inputYourName && parsed.yourName) inputYourName.value = parsed.yourName;
      if (inputPartnerName && parsed.partnerName) inputPartnerName.value = parsed.partnerName;
      if (inputAnnivDate && parsed.annivDate) inputAnnivDate.value = parsed.annivDate;
      if (inputSubtitle && parsed.subtitle) inputSubtitle.value = parsed.subtitle;
    }
  } catch (e) {
    // ignore storage errors
  }

  function openDrawer() {
    if (drawer) drawer.hidden = false;
  }

  function closeDrawer() {
    if (drawer) drawer.hidden = true;
    if (alertBox) alertBox.hidden = true;
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
  document.querySelectorAll('.open-customizer-trigger').forEach((btn) => {
    btn.addEventListener('click', openDrawer);
  });
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const yourName = inputYourName ? inputYourName.value.trim() : '';
      const partnerName = inputPartnerName ? inputPartnerName.value.trim() : '';
      const annivDate = inputAnnivDate ? inputAnnivDate.value.trim() : '';
      const subtitle = inputSubtitle ? inputSubtitle.value.trim() : '';

      if (!yourName || !partnerName || !annivDate) {
        if (alertBox) {
          alertBox.textContent = 'Please fill in all 3 required fields (Your Name, Her Name, and Anniversary Date).';
          alertBox.hidden = false;
        }
        return;
      }

      const payload = { yourName, partnerName, annivDate, subtitle };
      applyPersonalization(payload);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (err) {
        // ignore
      }
      closeDrawer();
    });
  }

  if (resetDrawerBtn) {
    resetDrawerBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        // ignore
      }
      window.location.reload();
    });
  }
})();
