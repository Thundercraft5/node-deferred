import makeErrors from "@thundercraft5/node-errors";

export const { DeferredError } = makeErrors({
	DEFERRED_ALREADY_COMPLETE: (id: number) => `The deferred with id #${ id } has already been resolved or rejected.`,
	REJECTION_REASON_NOT_ERROR: (value: any) => `Deferred rejection reasons must be subclasses of "Error" (got ${ typeof value } "${ String(value) }" instead).`,
}, {
	DeferredError: class DeferredError extends Error {},
});