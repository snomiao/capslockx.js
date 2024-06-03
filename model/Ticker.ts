export function Ticker<Model extends { tick: (dt: number) => boolean | void }>(
  model: Model,
) {
  let { st = 0, id = NaN } = {};
  return Object.assign(model, {
    start() {
      if (id) return true;
      this.done = false;
      st = 0;
      this.ticker();
      // id = setInterval(() => this.ticker(), 16);
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
      // clearInterval(id), (id = NaN);
      clearTimeout(id), (id = NaN);
      return (this.done = true);
    },
    done: true,
  });
}
