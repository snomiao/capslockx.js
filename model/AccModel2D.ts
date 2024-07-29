import { AccModel0D, AccModelOptions } from "./AccModel0D";

export function AccModel2D(
  onMove: (dx: number, dy: number) => void, // output callback
  opts: AccModelOptions = {},
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
    left: AccModel0D((d) => (x -= d), opts),
    right: AccModel0D((d) => (x += d), opts),
    up: AccModel0D((d) => (y -= d), opts),
    down: AccModel0D((d) => (y += d), opts),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
    },
  };
}
