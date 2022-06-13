export declare type DeferredResolver<T = any> = (value: T | PromiseLike<T>) => void;
export declare type DeferredRejector = (reason: Error) => void;
export declare type DeferredExecutor<T> = (resolve: DeferredResolver<T>, reject: DeferredRejector, deferred: Deferred<T>) => void;
export declare type DeferredState = "pending" | "rejected" | "resolved";
export default class Deferred<T = any> extends Promise<T> {
    #private;
    get completed(): boolean;
    get state(): DeferredState;
    get rejected(): boolean;
    get resolved(): boolean;
    get rejectionReason(): Error | null;
    get id(): number;
    constructor(executor?: DeferredExecutor<T>);
    reject(reason: Error): this;
    resolve(value: T | PromiseLike<T>): this;
    static get [Symbol.species](): typeof Deferred;
}
//# sourceMappingURL=Deferred.d.ts.map