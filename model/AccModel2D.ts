import { AccModel1D } from "./AccModel1D";

export function AccModel2D(
  onMove: (dx: number, dy: number) => void,
  { speed = 1, halflife = 50 } = {},
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
      const xdone = this.left.done && this.right.done;
      const ydone = this.up.done && this.down.done;
      this.done = xdone && ydone;
      // output
      const { dx = x | 0, dy = y | 0 } = {};
      onMove(dx, dy);
      (x -= dx), (y -= dy);
      // done
      return this.done;
    },
    left: AccModel1D((d) => (x -= d), { speed, halflife }),
    right: AccModel1D((d) => (x += d), { speed, halflife }),
    up: AccModel1D((d) => (y -= d), { speed, halflife }),
    down: AccModel1D((d) => (y += d), { speed, halflife }),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
    },
  };
}
