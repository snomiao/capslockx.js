import { fireEvent } from "@testing-library/dom";
import { MouseButton } from "@testing-library/user-event/dist/cjs/system/pointer/buttons.js";


export function MouseButtonControl(cursor: { x: number; y: number; }) {
  let el: HTMLElement | undefined = undefined;
  let pressed: Partial<Record<MouseButton, number>> = {};

  return {
    press(key: MouseButton) {
      if (pressed[key]) return;
      el ??= ([...document.querySelectorAll("*")] as HTMLElement[])
        .reverse()
        .find((e) => {
          const rect = e.getBoundingClientRect();
          if (rect.left < cursor.x &&
            cursor.x < rect.right &&
            rect.top < cursor.y &&
            cursor.y < rect.bottom)
            return true;
        });
      // press
      pressed[key] = +new Date();

      if (el) el.focus();
      el && fireEvent.focusIn(el);
      el && fireEvent.mouseDown(el, { ...pressed });
      return true;
    },
    release(key?: MouseButton) {
      if (!key) return (pressed = {}), (el = undefined);
      if (el) {
        fireEvent.mouseUp(el, { ...pressed });
        if (pressed[key]) fireEvent.click(el);
      }
      pressed[key] = undefined;
      if (!Object.keys(pressed).length) el = undefined;
    },
  };
}
