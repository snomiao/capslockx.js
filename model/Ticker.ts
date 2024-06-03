export function Ticker<
  Tickable extends { tick: (dt: number) => boolean | void },
>(model: Tickable) {
  let { st = 0, id = NaN } = {};
  return Object.assign(model, {
    start() {
      if (id) return true;
      this.done = false;
      st = 0;
      this.ticker();
      return true;
    },
    ticker() {
      const now = +new Date();
      const dt = st ? (now - st) / 1000 : 0;
      st = now;
      if (model.tick(dt)) return this.end();
      id = setTimeout(() => this.ticker(), 7);
    },
    end() {
      clearTimeout(id), (id = NaN);
      return (this.done = true);
    },
    done: true,
  });
}
