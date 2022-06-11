import Deferred from "./Deferred";

export { default, default as Deferred } from "./Deferred";
export * from "./Deferred";
export * from "./errors";
export { default as ProgressedDeferred } from "./ProgressedDeferred";
export * from "./ProgressedDeferred";

new Deferred<string>().resolve("").resolve("");