export type AccModelOptions = {
  // how many unit per second if keep press
  speed?: number;
  // how long speed goes half after release in ms
  halflife?: number;
  // stop timer at a low velocity threshold (speed)
  stopV?: number;
};
export function AccModel0D(
  onMove: (d: number) => void,
  { speed = 1, halflife = 50, stopV = 0.01 }: AccModelOptions = {},
) {
  let { x = 0, v = 0, a = 0 } = {};
  return {
    start() {}, // do noting if not loaded with a ticker
    onMove,
    tick(dt: number) {
      this.done = false;
      // rush
      if (!dt) return this.onMove(1);

      // acc
      x += dt * (v += dt * a * Math.E ** dt);

      // to int
      const d = x | 0;
      x -= d;
      if (d) this.onMove(d);

      // friction
      if (!a) v *= 0.5 ** (dt / (halflife / 1000));

      if (Math.abs(v) <= stopV && a === 0) {
        v = a = 0;
        return (this.done = true);
      }
    },
    press() {
      this.start();
      ((a = speed), (this.done = false));
    },
    release: () => (a = 0),
    done: true,
  };
}
