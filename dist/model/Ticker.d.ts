export declare function Ticker<Model extends {
    tick: (dt: number) => boolean | void;
}>(model: Model): Model & {
    start(): true;
    ticker(): true | undefined;
    end(): true;
    done: boolean;
};
