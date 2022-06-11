import { DeferredError } from "./errors";

export type DeferredResolver<T = any> = (value: T | PromiseLike<T>) => void;
export type DeferredRejector = (reason: Error) => void;
export type DeferredExecutor<T> = (resolve: DeferredResolver<T>, reject: DeferredRejector, deferred: Deferred<T>) => void;
export type DeferredState = "pending" | "rejected" | "resolved";

export default class Deferred<T = any> extends Promise<T> {
	static #count = 0;

	#resolve: DeferredResolver<T>;
	#reject: DeferredRejector;
	#state: DeferredState = "pending";
	#completed = false;
	#id = Deferred.#count++;
	#rejectionReason?: Error;

	get completed() { return this.#completed; }
	get state() { return this.#state; }
	get rejected() { return this.state === "rejected"; }
	get resolved() { return this.state === "resolved"; }
	get rejectionReason() { return this.#rejectionReason ?? null; }
	get id() { return this.#id; }

	constructor(executor?: DeferredExecutor<T>) {
		let resolve: DeferredResolver<T>, reject: DeferredRejector;

		super((_resolve, _reject) => {
			resolve = _resolve;
			reject = _reject;
		});

		this.#resolve = value => {
			this.#assertNotCompleted();
			this.#state = "resolved";
			resolve(value);

			return this.#finished();
		};
		this.#reject = reason => {
			this.#assertNotCompleted();
			this.#state = "rejected";
			reject(reason);

			return this.#finished();
		};

		if (typeof executor === "function") executor.call(this, this.#resolve, this.#reject, this);
	}

	reject(reason: Error) {
		if (!(reason instanceof Error)) throw new DeferredError("REJECTION_REASON_NOT_ERROR", reason);

		return this.#reject(reason), this;
	}

	resolve(value: T | PromiseLike<T>) {
		return this.#resolve(value), this;
	}

	#finished() {
		this.#completed = true;

		return this;
	}

	#assertNotCompleted() {
		if (this.#completed) throw new DeferredError("DEFERRED_ALREADY_COMPLETE", this.#id);
	}

	static [Symbol.species] = Deferred;
}