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
export declare type ProgressedDeferredExecutor<T = void, M extends EventProcessorMap = EventProcessorMap> = (resolve: DeferredResolver<T>, reject: DeferredRejector, progress: ProgressedDeferred<T, M>["progress"], deferred: ProgressedDeferred<T, M>) => void;
export declare type ProgressListener<This extends Deferred> = (this: This, ...args: any[]) => void;
export default class ProgressedDeferred<T = void, M extends EventProcessorMap = {}> extends Deferred<T> {
    #private;
    get id(): number;
    get progressState(): keyof M;
    constructor(executor?: ProgressedDeferredExecutor<T, M>);
    progressed<E extends keyof M>(event: Exclude<E, number | symbol>, listener: (...params: ToListenerMap<M>[E]) => void & ThisType<this>): this;
    progress<E extends keyof M & string>(event: E, ...eventParams: ToListenerMap<M>[E]): this;
    static get [Symbol.species](): typeof ProgressedDeferred;
}
//# sourceMappingURL=ProgressedDeferred.d.ts.map