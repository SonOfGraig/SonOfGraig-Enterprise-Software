// A tiny shared state between Graig's page (React) and his stage (three.js).
// No three import here, so the page can read and write it before the stage loads.
export const BUS = {
  orb: 'idle', // the state he rests in (cycles on its own until a visitor picks one)
  auto: true, // false once a visitor picks a state
  preview: null, // a state shown while a visitor hovers its button
  shown: 'idle', // what the orb is showing right now (written by the stage)
  chainFocus: -1, // the log row a visitor is on: the chain camera travels to that block
  vaultStep: -1, // the privacy seal a visitor is on: that many tumblers lock
  listeners: new Set(),
  set(k, v) {
    if (this[k] === v) return;
    this[k] = v;
    this.listeners.forEach((f) => f(k, v));
  },
  on(f) {
    this.listeners.add(f);
    return () => this.listeners.delete(f);
  },
};
