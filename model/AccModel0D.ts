export type AccModelOptions = Parameters<typeof AccModel0D>[1];
export function AccModel0D(
  onMove: (d: number) => void,
  { speed = 1, halflife = 50, stopV = 0.01 } = {},
) {
  let { x = 0, v = 0, a = 0 } = {};
  return {
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
      (a = speed), (this.done = false);
    },
    release: () => (a = 0),
    done: true,
  };
}
