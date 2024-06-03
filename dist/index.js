// model/MonoAccModel.ts
function MonoAccModel(onMove, { speed = 1, halflife = 50 } = {}) {
  const container = document.createElement("div");
  document.querySelector("main")?.appendChild(container);
  const status = (msg) => container.innerHTML = msg;
  let { x = 0, v = 0, a = 0 } = {};
  return {
    onMove,
    tick(dt) {
      this.done = false;
      if (!dt)
        return this.onMove(1);
      x += dt * (v += dt * a * Math.E ** dt);
      const d = x | 0;
      x -= d;
      if (d)
        this.onMove(d);
      if (!a)
        v *= 0.5 ** (dt / (halflife / 1000));
      if (Math.abs(v) <= 0.01 && a === 0) {
        v = a = 0;
        return this.done = true;
      }
    },
    press() {
      a = speed, this.done = false;
    },
    release: () => a = 0,
    done: true
  };
}

// model/AccModel2D.ts
function AccModel2D(onMove, { speed = 1, halflife = 50 } = {}) {
  let { x = 0, y = 0 } = {};
  return {
    done: true,
    stop() {
      this.release();
      x = y = 0;
    },
    tick(dt) {
      !this.left.done && this.left.tick(dt);
      !this.right.done && this.right.tick(dt);
      !this.up.done && this.up.tick(dt);
      !this.down.done && this.down.tick(dt);
      this.done = this.left.done && this.right.done && this.up.done && this.down.done;
      const { dx = x | 0, dy = y | 0 } = {};
      onMove(dx, dy);
      x -= dx, y -= dy;
      return this.done;
    },
    left: MonoAccModel((d) => x -= d, { speed, halflife }),
    right: MonoAccModel((d) => x += d, { speed, halflife }),
    up: MonoAccModel((d) => y -= d, { speed, halflife }),
    down: MonoAccModel((d) => y += d, { speed, halflife }),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
    }
  };
}
// model/Ticker.ts
function Ticker(model) {
  let { st = 0, id = NaN } = {};
  return Object.assign(model, {
    start() {
      if (id)
        return true;
      this.done = false;
      st = 0;
      this.ticker();
      return true;
    },
    ticker() {
      const now = +new Date;
      const dt = st ? (now - st) / 1000 : 0;
      st = now;
      if (model.tick(dt))
        return this.end();
      id = setTimeout(() => this.ticker(), 7);
    },
    end() {
      clearTimeout(id), id = NaN;
      return this.done = true;
    },
    done: true
  });
}
export {
  Ticker,
  MonoAccModel,
  AccModel2D
};
