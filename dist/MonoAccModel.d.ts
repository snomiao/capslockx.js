export declare function MonoAccModel(onMove: (d: number) => void, { speed, halflife }?: {
    speed?: number | undefined;
    halflife?: number | undefined;
}): {
    onMove: (d: number) => void;
    tick(dt: number): true | void;
    press(): void;
    release: () => number;
    done: boolean;
};
