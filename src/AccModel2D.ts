import { MonoAccModel } from "./MonoAccModel";

export function AccModel2D(
  onMove: (dx: number, dy: number) => void,
  { speed = 1, halflife = 50 } = {}
) {
  let { x = 0, y = 0 } = {};
  return {
    done: true,
    stop() {
      this.release();
      x = y = 0;
    },
    tick(dt: number) {
      // accu
      !this.left.done && this.left.tick(dt);
      !this.right.done && this.right.tick(dt);
      !this.up.done && this.up.tick(dt);
      !this.down.done && this.down.tick(dt);
      this.done =
        this.left.done && this.right.done && this.up.done && this.down.done;
      // output
      const { dx = x | 0, dy = y | 0 } = {};
      onMove(dx, dy);
      (x -= dx), (y -= dy);
      // done
      return this.done;
    },
    left: MonoAccModel((d) => (x -= d), { speed, halflife }),
    right: MonoAccModel((d) => (x += d), { speed, halflife }),
    up: MonoAccModel((d) => (y -= d), { speed, halflife }),
    down: MonoAccModel((d) => (y += d), { speed, halflife }),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
    },
  };
}
