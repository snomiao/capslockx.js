export function MonoAccModel(
  onMove: (d: number) => void,
  { speed = 1, halflife = 50 } = {}
) {
  const container = document.createElement("div");
  document.querySelector("main")?.appendChild(container);
  const status = (msg: string) => (container.innerHTML = msg);

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

      // const e = [v, a].map(Math.abs).reduce((a, b) => a + b);
      // status("tick " + JSON.stringify([x, v, a, dt, this.done], null, 2));
      if (Math.abs(v) <= 0.01 && a === 0) {
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
