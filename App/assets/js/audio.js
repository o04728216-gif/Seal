/**
 * Luxury Acoustic Synthesizer (Web Audio API)
 * High-end acoustic bell chimes, harmonic singing bowl resonance, and tactile audio feedback.
 */
class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initialized = false;
    this.droneGain = null;
    this.droneOsc = null;
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn("AudioContext not permitted:", e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.resume();
      this.playPing(880, 0.35); // A5 chime feedback
    }
    return this.enabled;
  }

  /**
   * Premium Crystalline "Bing" Bell Chime
   * Multi-partial additive synthesis modeling an antique brass bell & crystal glass resonance.
   */
  playPing(baseFreq = 659.25, volume = 0.4) {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Rich overtone series for luxury crystalline ring
    const partials = [
      { ratio: 1.00, gain: 0.65, decay: 1.8 },
      { ratio: 2.76, gain: 0.28, decay: 1.2 },
      { ratio: 4.12, gain: 0.16, decay: 0.8 },
      { ratio: 5.43, gain: 0.09, decay: 0.5 },
      { ratio: 8.21, gain: 0.04, decay: 0.3 }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * p.ratio, t);

      // Micro detune for celestial shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 6, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(volume * p.gain, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.00005, t + p.decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + p.decay + 0.05);
    });
  }

  /**
   * Continuous rising harmonic shimmer during the 3-second press & hold
   */
  startHoldShimmer() {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    this.stopHoldShimmer();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t); // A3
    osc.frequency.exponentialRampToValueAtTime(554.37, t + 3.0); // Rises smoothly to C#5

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.exponentialRampToValueAtTime(3200, t + 3.0);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.09, t + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    this.droneOsc = osc;
    this.droneGain = gain;
  }

  stopHoldShimmer() {
    if (this.droneOsc && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.droneGain.gain.cancelScheduledValues(t);
        this.droneGain.gain.linearRampToValueAtTime(0.0001, t + 0.15);
        this.droneOsc.stop(t + 0.2);
      } catch (e) {}
      this.droneOsc = null;
      this.droneGain = null;
    }
  }

  /**
   * Crisp wax crack / fracture sound
   */
  playCrack() {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2200;
    filter.Q.value = 3.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(t);
  }

  /**
   * Grand reveal celestial chord (E Major 9th / B Major)
   */
  playGrandReveal() {
    if (!this.enabled || !this.ctx) return;
    this.stopHoldShimmer();
    this.playCrack();

    // Strummed luxury celestial chord
    const chord = [329.63, 415.30, 493.88, 659.25, 830.61, 987.77, 1318.51];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playPing(freq, 0.32);
      }, idx * 40);
    });
  }
}

window.luxuryAudio = new LuxuryAudioEngine();
