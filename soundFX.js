/**
 * KMS Travels — Tactical UI Sound Synthesizer (Web Audio API)
 * Zero external audio assets required. Mute / Unmute state stored in localStorage.
 */

class SoundFX {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem('kms_sound_muted') === 'true';
    }

    initCtx() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('kms_sound_muted', this.muted);
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }

    // Gentle hover tick
    playHover() {
        if (this.muted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {
            // Audio context fallback ignore
        }
    }

    // Satisfying soft button click
    playClick() {
        if (this.muted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(260, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(130, this.ctx.currentTime + 0.07);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.07);
        } catch (e) {
            // Audio fallback ignore
        }
    }

    // Theme change chime
    playThemeChime() {
        if (this.muted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

                gain.gain.setValueAtTime(0.04, this.ctx.currentTime + idx * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.05 + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(this.ctx.currentTime + idx * 0.05);
                osc.stop(this.ctx.currentTime + idx * 0.05 + 0.25);
            });
        } catch (e) {
            // Audio fallback
        }
    }

    // Success calculation chime
    playSuccess() {
        if (this.muted) return;
        try {
            this.initCtx();
            if (!this.ctx) return;

            const notes = [587.33, 880, 1174.66]; // D5, A5, D6
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

                gain.gain.setValueAtTime(0.05, this.ctx.currentTime + idx * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.3);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(this.ctx.currentTime + idx * 0.06);
                osc.stop(this.ctx.currentTime + idx * 0.06 + 0.3);
            });
        } catch (e) {
            // Audio fallback
        }
    }
}

export const soundFX = new SoundFX();
