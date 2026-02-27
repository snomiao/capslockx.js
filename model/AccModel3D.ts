import { AccModel0D, AccModelOptions } from "./AccModel0D";

export function AccModel3D(
  onMove: (dx: number, dy: number, dz: number) => void,
  opts: AccModelOptions = {},
) {
  let { x = 0, y = 0, z = 0 } = {};
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
      !this.fore.done && this.fore.tick(dt);
      !this.back.done && this.back.tick(dt);
      const xdone = this.left.done && this.right.done;
      const ydone = this.up.done && this.down.done;
      const zdone = this.fore.done && this.back.done;
      this.done = xdone && ydone && zdone;
      // output int
      const { dx = x | 0, dy = y | 0, dz = z | 0 } = {};
      onMove(dx, dy, dz);
      ((x -= dx), (y -= dy), (z -= dz));
      // done
      return this.done;
    },
    // right hand coordinate system
    left: AccModel0D((d) => (x -= d), opts),
    right: AccModel0D((d) => (x += d), opts),
    up: AccModel0D((d) => (y -= d), opts),
    down: AccModel0D((d) => (y += d), opts),
    fore: AccModel0D((d) => (z -= d), opts),
    back: AccModel0D((d) => (z += d), opts),
    release() {
      this.left.release();
      this.right.release();
      this.up.release();
      this.down.release();
      this.fore.release();
      this.back.release();
    },
  };
}
