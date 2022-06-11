import Deferred, { DeferredRejector, DeferredResolver, DeferredState } from "./Deferred";
import { DeferredError } from "./errors";

export type ProgressListenerMap = {
	[key: string]: [...args: any];
};
export type EventProcessorMap = {
	[key: string]: (...args: any[]) => any;
};
export type ToListenerMap<T extends EventProcessorMap> = {
	[K in keyof T]: Parameters<T[K]>;
};
export type ProgressedDeferredExecutor<
	T = void,
	M extends EventProcessorMap = EventProcessorMap,
> = (resolve: DeferredResolver<T>, reject: DeferredRejector, progress: ProgressedDeferred<T, M>["progress"], deferred: ProgressedDeferred<T, M>) => void;
export type ProgressListener<This extends Deferred> = (this: This, ...args: any[]) => void;

// @ts-ignore
export default class ProgressedDeferred<
	T = void,
	M extends EventProcessorMap = {},
> extends Deferred<T> {
	static #listeners = new WeakMap<any, Map<string, ((...args: any[]) => void)[]>>();
	static #count = 0;

	#id = ProgressedDeferred.#count++;
	#progress: keyof M;

	get id() { return this.#id; }
	get progressState() { return this.#progress; }

	constructor(executor?: ProgressedDeferredExecutor<T, M>) {
		super(() => {});

		ProgressedDeferred.#listeners.set(this, new Map());

		this.resolve = this.resolve.bind(this);
		this.reject = this.reject.bind(this);
		this.progress = this.progress.bind(this);

		if (typeof executor === "function") executor.call(this, this.resolve, this.reject, this.progress, this);
	}

	progressed<E extends keyof M>(event: Exclude<E, number | symbol>, listener: (...params: ToListenerMap<M>[E]) => void & ThisType<this>) {
		this.#assertNotCompleted();
		this.#addListener(event, listener);

		return this;
	}

	#assertNotCompleted() {
		if (this.completed) throw new DeferredError("DEFERRED_ALREADY_COMPLETE", this.#id);
	}

	progress<E extends keyof M & string>(event: E, ...eventParams: ToListenerMap<M>[E]) {
		const map = ProgressedDeferred.#listeners.get(this)!;

		if (!map.has(event)) map.set(event, []);
		map.get(event)!.forEach(listener => listener.call(this, ...eventParams));

		return this;
	}


	#addListener<E extends keyof M>(event: Exclude<E, number | symbol>, listener: (...args: ToListenerMap<M>[E]) => void & ThisType<this>) {
		const map = ProgressedDeferred.#listeners.get(this)!;

		if (!map.has(event)) map.set(event, []);

		map.get(event)!.push(listener as (...args: any[]) => void & ThisType<this>);
	}

	static [Symbol.species] = ProgressedDeferred;
}

// @ts-ignore
await new ProgressedDeferred<string, { test(key: string) }>().reject("Test");