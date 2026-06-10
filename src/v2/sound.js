/* Tiny 8-bit style sound engine via WebAudio. No assets needed. */
let ctx = null;
let enabled = true;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setSoundEnabled(v) {
  enabled = v;
}

export function isSoundEnabled() {
  return enabled;
}

function beep({ freq = 440, dur = 0.06, type = 'square', vol = 0.04, slide = 0 }) {
  if (!enabled) return;
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), c.currentTime + dur);
  gain.gain.setValueAtTime(vol, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + dur);
}

export const sfx = {
  click: () => beep({ freq: 880, dur: 0.04 }),
  open: () => beep({ freq: 320, dur: 0.12, slide: 420 }),
  close: () => beep({ freq: 620, dur: 0.1, slide: -380 }),
  minimize: () => beep({ freq: 500, dur: 0.07, slide: -200 }),
  error: () => beep({ freq: 140, dur: 0.18, type: 'sawtooth', vol: 0.05 }),
  boot: () => beep({ freq: 220, dur: 0.25, slide: 660, vol: 0.05 }),
  key: () => beep({ freq: 1200, dur: 0.015, vol: 0.015 }),
};
