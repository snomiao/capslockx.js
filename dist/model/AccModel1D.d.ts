import { AccModelOptions } from "./AccModel0D";
export declare function AccModel1D(onMove: (dx: number, dy: number) => void, opts?: AccModelOptions): {
    done: boolean;
    stop(): void;
    tick(dt: number): boolean;
    left: {
        onMove: (d: number) => void;
        tick(dt: number): true | void;
        press(): void;
        release: () => number;
        done: boolean;
    };
    right: {
        onMove: (d: number) => void;
        tick(dt: number): true | void;
        press(): void;
        release: () => number;
        done: boolean;
    };
    release(): void;
};
