import Deferred, { DeferredRejector, DeferredResolver } from "./Deferred";
export declare type ProgressListenerMap = {
    [key: string]: [...args: any];
};
export declare type EventProcessorMap = {
    [key: string]: (...args: any[]) => any;
};
export declare type ToListenerMap<T extends EventProcessorMap> = {
    [K in keyof T]: Parameters<T[K]>;
};
export declare type ProgressedDeferredExecutor<T = any, M extends EventProcessorMap = EventProcessorMap> = (progress: ProgressedDeferred<T, M>["progress"], resolve: DeferredResolver<T>, reject: DeferredRejector) => void;
export declare type ProgressListener<This extends Deferred> = (this: This, ...args: any[]) => void;
export default class ProgressedDeferred<T = any, M extends EventProcessorMap = {}> extends Deferred<T> {
    #private;
    get id(): number;
    get progressState(): keyof M;
    constructor(executor?: ProgressedDeferredExecutor<T, M>);
    progressed<E extends keyof M>(event: Exclude<E, number | symbol>, listener: (...params: ToListenerMap<M>[E]) => void): this;
    progress<E extends keyof M & string>(event: E, ...eventParams: ToListenerMap<M>[E]): this;
    static [Symbol.species]: typeof ProgressedDeferred;
}
//# sourceMappingURL=ProgressedDeferred.d.ts.map