// Music and Sound Controller for Flask Templates
// Starts only after a user gesture and handles missing audio files gracefully via Web Audio API synthesis.

window.AnniversaryAudio = (function () {
  let ctx = null;
  let isPlaying = false;
  let isMuted = false;
  let timer = null;
  let step = 0;
  const chords = [
    [174.61, 261.63, 349.23, 440.0],
    [164.81, 261.63, 329.63, 392.0],
    [146.83, 220.0, 293.66, 349.23],
    [116.54, 233.08, 293.66, 349.23],
  ];

  function ensureCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playNote() {
    if (isMuted) return;
    const c = ensureCtx();
    if (!c) return;
    const chord = chords[Math.floor(step / 4) % chords.length];
    const freq = chord[step % chord.length];
    step++;

    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(0.001, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, c.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0005, c.currentTime + 2.0);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + 2.1);
  }

  function toggle() {
    if (isPlaying) {
      isPlaying = false;
      if (timer) clearInterval(timer);
    } else {
      isPlaying = true;
      playNote();
      timer = setInterval(playNote, 950);
    }
    updateUI();
    return isPlaying;
  }

  function toggleMute() {
    isMuted = !isMuted;
    updateUI();
    return isMuted;
  }

  function updateUI() {
    const label = document.getElementById('music-state-label');
    const muteBtn = document.getElementById('mute-toggle-btn');
    if (label) {
      label.textContent = isPlaying ? 'Pause Music 🎵' : 'Play Music 🎵';
    }
    if (muteBtn) {
      muteBtn.hidden = !isPlaying;
      muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
    }
  }

  return { toggle, toggleMute, isPlaying: () => isPlaying };
})();
