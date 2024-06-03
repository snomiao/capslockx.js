export declare function AccModel2D(onMove: (dx: number, dy: number) => void, { speed, halflife }?: {
    speed?: number | undefined;
    halflife?: number | undefined;
}): {
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
    up: {
        onMove: (d: number) => void;
        tick(dt: number): true | void;
        press(): void;
        release: () => number;
        done: boolean;
    };
    down: {
        onMove: (d: number) => void;
        tick(dt: number): true | void;
        press(): void;
        release: () => number;
        done: boolean;
    };
    release(): void;
};
