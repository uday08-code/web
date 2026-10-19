// Interactive Love Notes, Bouquet Reveal, Anniversary Letter, and Surprise Buttons
(function () {
  // Love Notes expand/collapse
  document.querySelectorAll('[data-note-card]').forEach((card) => {
    const btn = card.querySelector('.note-toggle-btn');
    const full = card.querySelector('.note-full');
    if (btn && full) {
      btn.addEventListener('click', () => {
        full.hidden = !full.hidden;
        btn.textContent = full.hidden ? 'Read Personal Note' : 'Close Note';
      });
    }
  });

  // Bouquet Reveal
  const sendBouquetBtn = document.getElementById('send-bouquet-btn');
  const replayBouquetBtn = document.getElementById('replay-bouquet-btn');
  const bouquetStage = document.getElementById('bouquet-reveal-stage');
  if (sendBouquetBtn && bouquetStage) {
    sendBouquetBtn.addEventListener('click', () => {
      bouquetStage.hidden = false;
      if (replayBouquetBtn) replayBouquetBtn.hidden = false;
    });
  }

  // Anniversary Letter Open / Read Again / Download
  const envelopeBox = document.getElementById('envelope-closed');
  const letterPaper = document.getElementById('letter-paper');
  const openLetterBtn = document.getElementById('open-letter-btn');
  const readAgainBtn = document.getElementById('read-again-btn');
  const downloadLetterBtn = document.getElementById('download-letter-btn');

  if (openLetterBtn && envelopeBox && letterPaper) {
    openLetterBtn.addEventListener('click', () => {
      envelopeBox.hidden = true;
      letterPaper.hidden = false;
    });
  }
  if (readAgainBtn && envelopeBox && letterPaper) {
    readAgainBtn.addEventListener('click', () => {
      letterPaper.hidden = true;
      setTimeout(() => {
        letterPaper.hidden = false;
      }, 150);
    });
  }
  if (downloadLetterBtn && letterPaper) {
    downloadLetterBtn.addEventListener('click', () => {
      const paragraphs = Array.from(letterPaper.querySelectorAll('#letter-paragraphs p')).map(
        (p) => p.textContent
      );
      const blob = new Blob([paragraphs.join('\n\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'first-anniversary-letter-october-20.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Surprise Buttons
  const outputBox = document.getElementById('surprise-output');
  const outputText = document.getElementById('surprise-output-text');
  if (outputBox && outputText) {
    const wishes = JSON.parse(outputBox.dataset.wishes || '[]');
    const photos = JSON.parse(outputBox.dataset.photos || '[]');
    let wishIdx = 0;
    let photoIdx = 0;

    const btnWish = document.getElementById('btn-wish');
    const btnHug = document.getElementById('btn-hug');
    const btnSecret = document.getElementById('btn-secret');
    const btnMemory = document.getElementById('btn-memory');
    const btnSong = document.getElementById('btn-song');
    const btnBeginning = document.getElementById('btn-beginning');

    if (btnWish) {
      btnWish.addEventListener('click', () => {
        wishIdx = (wishIdx + 1) % wishes.length;
        outputText.textContent = wishes[wishIdx];
      });
    }
    if (btnHug) {
      btnHug.addEventListener('click', () => {
        outputText.textContent = outputBox.dataset.hug || '';
      });
    }
    if (btnSecret) {
      btnSecret.addEventListener('click', () => {
        outputText.textContent = outputBox.dataset.secret || '';
      });
    }
    if (btnMemory && photos.length > 0) {
      btnMemory.addEventListener('click', () => {
        photoIdx = (photoIdx + 1) % photos.length;
        outputText.textContent = photos[photoIdx].caption + ' (' + photos[photoIdx].date + ')';
      });
    }
    if (btnSong && window.AnniversaryAudio) {
      btnSong.addEventListener('click', () => {
        const playing = window.AnniversaryAudio.toggle();
        outputText.textContent = playing
          ? 'Playing our anniversary melody...'
          : 'Anniversary melody paused.';
      });
    }
    if (btnBeginning) {
      btnBeginning.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Final Celebration Button
  const celebrateBtn = document.getElementById('celebrate-love-btn');
  const finalBox = document.getElementById('final-celebration-box');
  if (celebrateBtn && finalBox) {
    celebrateBtn.addEventListener('click', () => {
      finalBox.hidden = false;
    });
  }
})();
