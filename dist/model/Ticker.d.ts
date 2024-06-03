export declare function Ticker<Tickable extends {
    tick: (dt: number) => boolean | void;
}>(model: Tickable): Tickable & {
    start(): true;
    ticker(): true | undefined;
    end(): true;
    done: boolean;
};
