// Web Audio API Synthesizer for Romantic Ambient Music & Optional Sound Effects
// Works 100% locally without external MP3 dependencies, while also supporting local MP3 playback if supplied.

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private isMuted = false;
  private sfxEnabled = false;
  private loopTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private usingLocalMp3 = false;
  private stepIndex = 0;

  // Romantic chord progression in F Major / D Minor (Fmaj7 - Cmaj7/E - Dm7 - Bbmaj7)
  private chords = [
    [174.61, 261.63, 349.23, 440.0, 523.25], // Fmaj7
    [164.81, 261.63, 329.63, 392.0, 493.88], // Cmaj7/E
    [146.83, 220.0, 293.66, 349.23, 440.0],  // Dm7
    [116.54, 233.08, 293.66, 349.23, 440.0], // Bbmaj7
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.22;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public async startMusic(localMp3Url?: string): Promise<boolean> {
    if (this.isMusicPlaying) return true;

    // First try local MP3 if provided and reachable
    if (localMp3Url && !this.audioElement) {
      try {
        const res = await fetch(localMp3Url, { method: 'HEAD' });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('audio')) {
          this.audioElement = new Audio(localMp3Url);
          this.audioElement.loop = true;
          this.audioElement.volume = this.isMuted ? 0 : 0.5;
          await this.audioElement.play();
          this.usingLocalMp3 = true;
          this.isMusicPlaying = true;
          return true;
        }
      } catch {
        // Fallback gracefully to Web Audio romantic piano box synthesizer
      }
    }

    if (this.usingLocalMp3 && this.audioElement) {
      try {
        await this.audioElement.play();
        this.isMusicPlaying = true;
        return true;
      } catch {
        // fallback
      }
    }

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return false;

    this.isMusicPlaying = true;
    this.playNextArpeggioNote();
    this.loopTimer = window.setInterval(() => {
      if (this.isMusicPlaying && !this.isMuted) {
        this.playNextArpeggioNote();
      }
    }, 950);

    return true;
  }

  private playNextArpeggioNote() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const chordIdx = Math.floor(this.stepIndex / 4) % this.chords.length;
    const noteIdx = this.stepIndex % 5;
    const freq = this.chords[chordIdx][noteIdx];
    this.stepIndex++;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.12);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + 2.4);

    osc.connect(noteGain);
    subOsc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 2.5);
    subOsc.stop(now + 2.5);
  }

  public pauseMusic() {
    this.isMusicPlaying = false;
    if (this.loopTimer !== null) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public toggleMusic(localMp3Url?: string): Promise<boolean> {
    if (this.isMusicPlaying) {
      this.pauseMusic();
      return Promise.resolve(false);
    } else {
      return this.startMusic(localMp3Url);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.22, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = muted ? 0 : 0.5;
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
  }

  public getState() {
    return {
      isPlaying: this.isMusicPlaying,
      isMuted: this.isMuted,
      sfxEnabled: this.sfxEnabled,
      usingLocalMp3: this.usingLocalMp3,
    };
  }

  public playSoundEffect(type: 'envelope' | 'surprise' | 'bouquet' | 'celebration') {
    if (!this.sfxEnabled || this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const notes =
      type === 'envelope'
        ? [392.0, 493.88, 587.33]
        : type === 'bouquet'
        ? [349.23, 440.0, 523.25, 659.25]
        : type === 'celebration'
        ? [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]
        : [440.0, 554.37, 659.25];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.001, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.14, now + idx * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.09 + 0.85);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.9);
    });
  }
}

export const soundEngine = new RomanticAudioEngine();
