export type AccModelOptions = Parameters<typeof AccModel0D>[1];
export declare function AccModel0D(onMove: (d: number) => void, { speed, halflife, stopV }?: {
    speed?: number | undefined;
    halflife?: number | undefined;
    stopV?: number | undefined;
}): {
    onMove: (d: number) => void;
    tick(dt: number): true | void;
    press(): void;
    release: () => number;
    done: boolean;
};
