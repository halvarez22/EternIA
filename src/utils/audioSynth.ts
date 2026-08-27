// Web Audio API ambient synthesizer for cinematic emotional previews

class EtherealSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentInterval: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft bell/piano chime
  playNote(frequency: number, duration = 2.5, type: OscillatorType = 'sine') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    // Envelope
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Play emotional chord progression
  playChord(chord: number[]) {
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 3.2, idx % 2 === 0 ? 'sine' : 'triangle');
      }, idx * 120);
    });
  }

  // Play celebratory acoustic chime
  playSuccess() {
    this.playChord([293.66, 369.99, 440.0, 587.33, 739.99]);
  }

  playChime() {
    this.playNote(587.33, 2.0, 'triangle');
  }

  // Start continuous ethereal background ambiance
  startAmbient(mood: 'romantico' | 'solemne' | 'mistico' | 'festivo' = 'romantico') {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Frequencies (Hz): D Major / B Minor cinematic emotional scale
    const scales = {
      romantico: [
        [293.66, 369.99, 440.0, 587.33], // D maj9
        [246.94, 293.66, 369.99, 440.0],  // B min7
        [220.0, 277.18, 329.63, 440.0],   // A sus4
        [196.0, 246.94, 293.66, 392.0],   // G maj7
      ],
      solemne: [
        [220.0, 261.63, 329.63, 392.0],  // A min7
        [174.61, 220.0, 261.63, 349.23], // F maj7
        [196.0, 246.94, 293.66, 392.0],  // G maj
        [164.81, 196.0, 246.94, 329.63], // E min7
      ],
      mistico: [
        [261.63, 311.13, 392.0, 466.16], // C min7
        [233.08, 293.66, 349.23, 466.16], // Bb maj
        [207.65, 261.63, 311.13, 415.3],  // Ab maj7
        [196.0, 233.08, 293.66, 392.0],   // G min
      ],
      festivo: [
        [261.63, 329.63, 392.0, 523.25], // C maj
        [293.66, 369.99, 440.0, 587.33], // D maj
        [329.63, 392.0, 493.88, 659.25], // E min
        [246.94, 311.13, 369.99, 493.88], // B maj
      ]
    };

    const progression = scales[mood] || scales.romantico;
    let step = 0;

    this.playChord(progression[0]);

    this.currentInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      step = (step + 1) % progression.length;
      this.playChord(progression[step]);
    }, 4500);
  }

  stopAmbient() {
    this.isPlaying = false;
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export const soundscape = new EtherealSoundscape();
