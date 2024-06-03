import { MouseButton } from "@testing-library/user-event/dist/cjs/system/pointer/buttons.js";
export declare function MouseButtonControl(cursor: { x: number; y: number }): {
  press(key: MouseButton): true | undefined;
  release(key?: MouseButton): undefined;
};
