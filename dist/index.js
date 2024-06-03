// model/AccModel1D.ts
function AccModel1D(onMove, { speed = 1, halflife = 50 } = {}) {
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
      const xdone = this.left.done && this.right.done;
      const ydone = this.up.done && this.down.done;
      this.done = xdone && ydone;
      const { dx = x | 0, dy = y | 0 } = {};
      onMove(dx, dy);
      x -= dx, y -= dy;
      return this.done;
    },
    left: AccModel1D((d) => x -= d, { speed, halflife }),
    right: AccModel1D((d) => x += d, { speed, halflife }),
    up: AccModel1D((d) => y -= d, { speed, halflife }),
    down: AccModel1D((d) => y += d, { speed, halflife }),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
    }
  };
}
// model/AccModel3D.ts
function AccModel3D(onMove, { speed = 1, halflife = 50 } = {}) {
  let { x = 0, y = 0, z = 0 } = {};
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
      !this.fore.done && this.fore.tick(dt);
      !this.back.done && this.back.tick(dt);
      const xdone = this.left.done && this.right.done;
      const ydone = this.up.done && this.down.done;
      const zdone = this.fore.done && this.back.done;
      this.done = xdone && ydone && zdone;
      const { dx = x | 0, dy = y | 0, dz = z | 0 } = {};
      onMove(dx, dy, dz);
      x -= dx, y -= dy, z -= dz;
      return this.done;
    },
    left: AccModel1D((d) => x -= d, { speed, halflife }),
    right: AccModel1D((d) => x += d, { speed, halflife }),
    up: AccModel1D((d) => y -= d, { speed, halflife }),
    down: AccModel1D((d) => y += d, { speed, halflife }),
    fore: AccModel1D((d) => z -= d, { speed, halflife }),
    back: AccModel1D((d) => z += d, { speed, halflife }),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
      this.fore.release();
      this.back.release();
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
  AccModel3D,
  AccModel2D,
  AccModel1D
};
