var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  };
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// node_modules/@thundercraft5/node-errors/dist/index.js
function formatWordList(list, and = false) {
  const last = list.pop(), lastWord = and ? "and" : "or";
  if (list.length > 1) {
    const commaSeparated = list.map((s, i) => `${i % 5 == 0 && i ? "\n" : ""}"${s}"`);
    return `${commaSeparated.join(", ")}, ${lastWord} "${last}"`;
  } else
    return `${list.length == 1 ? `"${list[0]}" ${lastWord} ` : ""}"${last}"`;
}
function formatErrorMessage(messages2, code, ...formats) {
  if (!(code in messages2))
    throw new ReferenceError("INVALID_MESSAGE_CODE", code, formatWordList(Object.keys(messages2)));
  const message = typeof messages2[code] === "function" ? messages2[code](...formats) : messages2[code];
  if (typeof messages2[code] === "function" && messages2[code].length > formats.length)
    throw new RangeError("MESSAGE_CODE_MISSING_FORMATS", code, messages2[code].length, formats.length);
  return message;
}
function makeCodedError(messages2, Base) {
  if ("$$<Symbol>codedError" in Base)
    throw new TypeError2("ERROR_CLASS_ALREADY_EXTENDED", Base);
  return class extends Base {
    static get ["$$<Symbol>codedErrorClass"]() {
      return true;
    }
    static [Symbol.hasInstance](instance) {
      let constructor = instance[Symbol.species] || instance.constructor;
      return instance instanceof Base || constructor === this;
    }
    static {
      Object.defineProperty(this, "name", { value: Base.name });
    }
    #message = "";
    ["$$<Symbol>codedError"];
    ["$$<Symbol>code"];
    ["$$<Symbol>rawMessage"];
    constructor(code, ...formats) {
      super(formatErrorMessage(messages2, code, ...formats));
      if (typeof messages2[code] !== "string")
        this["$$<Symbol>rawMessage"] = messages2[code]?.toString() ?? null;
      this["$$<Symbol>code"] = code.toLocaleUpperCase();
      Object.defineProperty(this, "$$<Symbol>codedError", { value: true });
    }
    get name() {
      return `${this.getErrorName()}${this["$$<Symbol>code"] ? ` [${this["$$<Symbol>code"]}]` : ""}`;
    }
    get message() {
      return !this.#message ? "" : this.#message;
    }
    set message(value) {
      this.#message = value;
    }
    get [Symbol.species]() {
      return Base;
    }
    get [Symbol.toStringTag]() {
      return this.getErrorName();
    }
    getErrorName() {
      const names = [];
      let cur = this.constructor;
      while (cur) {
        names.push(cur.name);
        cur = Object.getPrototypeOf(cur);
      }
      return names.find((name) => name != "CodedError");
    }
  };
}
var messages = {
  ERROR_CLASS_ALREADY_EXTENDED: (Class) => `Error class "${Class.name}" is already a coded error class.`,
  INVALID_MESSAGE_CODE: (code = "", validCodes = "") => `Error code "${code}" was not found in the provided messages registry.
List of valid codes: ${validCodes}`,
  MESSAGE_CODE_MISSING_FORMATS: (code = "", required = 0, received = 0) => `Message code "${code}" expects at least ${required} format arguments, got ${received} instead`,
  METHOD_NOT_IMPLEMENTED: (Class, name = "") => `Method ${Class.name}#${name}() is not implemented.`
};
var nativeMessages_default = messages;
function makeErrors(messages2, errors, includeNativeCodes = true) {
  if (includeNativeCodes)
    messages2 = { ...messages2, ...nativeMessages_default };
  const ret = {};
  const entries = Object.entries(errors);
  for (const [k, error] of entries) {
    ret[k] = makeCodedError(messages2, error);
  }
  return ret;
}
var {
  TypeError: TypeError2,
  RangeError,
  ReferenceError,
  Error: Error2
} = makeErrors(nativeMessages_default, {
  TypeError: globalThis.TypeError,
  RangeError: globalThis.RangeError,
  ReferenceError: globalThis.ReferenceError,
  Error: globalThis.Error
});
var SymbolCodedErrorClass = Symbol("codedErrorClass");
var SymbolCodedError = Symbol("codedError");
var SymbolCode = Symbol("code");
var SymbolRawMessage = Symbol("rawMessage");

// src/errors.ts
var { DeferredError } = makeErrors({
  DEFERRED_ALREADY_COMPLETE: (id) => `The deferred with id #${id} has already been resolved or rejected.`,
  REJECTION_REASON_NOT_ERROR: (value) => `Deferred rejection reasons must be subclasses of "Error" (got ${typeof value} "${String(value)}" instead).`
}, {
  DeferredError: class DeferredError2 extends Error {
  }
});

// src/Deferred.ts
var _count, _resolve, _reject, _state, _completed, _id, _rejectionReason, _finished, finished_fn, _assertNotCompleted, assertNotCompleted_fn, _a;
var _Deferred = class extends Promise {
  constructor(executor) {
    let resolve, reject;
    super((_resolve2, _reject2) => {
      resolve = _resolve2;
      reject = _reject2;
    });
    __privateAdd(this, _finished);
    __privateAdd(this, _assertNotCompleted);
    __privateAdd(this, _resolve, void 0);
    __privateAdd(this, _reject, void 0);
    __privateAdd(this, _state, "pending");
    __privateAdd(this, _completed, false);
    __privateAdd(this, _id, __privateWrapper(_Deferred, _count)._++);
    __privateAdd(this, _rejectionReason, void 0);
    __privateSet(this, _resolve, (value) => {
      __privateMethod(this, _assertNotCompleted, assertNotCompleted_fn).call(this);
      __privateSet(this, _state, "resolved");
      resolve(value);
      return __privateMethod(this, _finished, finished_fn).call(this);
    });
    __privateSet(this, _reject, (reason) => {
      __privateMethod(this, _assertNotCompleted, assertNotCompleted_fn).call(this);
      __privateSet(this, _state, "rejected");
      reject(reason);
      return __privateMethod(this, _finished, finished_fn).call(this);
    });
    if (typeof executor === "function")
      executor.call(this, __privateGet(this, _resolve), __privateGet(this, _reject), this);
  }
  get completed() {
    return __privateGet(this, _completed);
  }
  get state() {
    return __privateGet(this, _state);
  }
  get rejected() {
    return this.state === "rejected";
  }
  get resolved() {
    return this.state === "resolved";
  }
  get rejectionReason() {
    return __privateGet(this, _rejectionReason) ?? null;
  }
  get id() {
    return __privateGet(this, _id);
  }
  reject(reason) {
    if (!(reason instanceof Error))
      throw new DeferredError("REJECTION_REASON_NOT_ERROR", reason);
    return __privateGet(this, _reject).call(this, reason), this;
  }
  resolve(value) {
    return __privateGet(this, _resolve).call(this, value), this;
  }
};
var Deferred = _Deferred;
_a = Symbol.species;
_count = new WeakMap();
_resolve = new WeakMap();
_reject = new WeakMap();
_state = new WeakMap();
_completed = new WeakMap();
_id = new WeakMap();
_rejectionReason = new WeakMap();
_finished = new WeakSet();
finished_fn = function() {
  __privateSet(this, _completed, true);
  return this;
};
_assertNotCompleted = new WeakSet();
assertNotCompleted_fn = function() {
  if (__privateGet(this, _completed))
    throw new DeferredError("DEFERRED_ALREADY_COMPLETE", __privateGet(this, _id));
};
__privateAdd(Deferred, _count, 0);
__publicField(Deferred, _a, _Deferred);

// src/ProgressedDeferred.ts
var _listeners, _count2, _id2, _progress, _assertNotCompleted2, assertNotCompleted_fn2, _addListener, addListener_fn, _a2;
var _ProgressedDeferred = class extends Deferred {
  constructor(executor) {
    super(() => {
    });
    __privateAdd(this, _assertNotCompleted2);
    __privateAdd(this, _addListener);
    __privateAdd(this, _id2, __privateWrapper(_ProgressedDeferred, _count2)._++);
    __privateAdd(this, _progress, void 0);
    __privateGet(_ProgressedDeferred, _listeners).set(this, /* @__PURE__ */ new Map());
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.progress = this.progress.bind(this);
    if (typeof executor === "function")
      executor.call(this, this.resolve, this.reject, this.progress, this);
  }
  get id() {
    return __privateGet(this, _id2);
  }
  get progressState() {
    return __privateGet(this, _progress);
  }
  progressed(event, listener) {
    __privateMethod(this, _assertNotCompleted2, assertNotCompleted_fn2).call(this);
    __privateMethod(this, _addListener, addListener_fn).call(this, event, listener);
    return this;
  }
  progress(event, ...eventParams) {
    const map = __privateGet(_ProgressedDeferred, _listeners).get(this);
    if (!map.has(event))
      map.set(event, []);
    map.get(event).forEach((listener) => listener.call(this, ...eventParams));
    return this;
  }
};
var ProgressedDeferred = _ProgressedDeferred;
_a2 = Symbol.species;
_listeners = new WeakMap();
_count2 = new WeakMap();
_id2 = new WeakMap();
_progress = new WeakMap();
_assertNotCompleted2 = new WeakSet();
assertNotCompleted_fn2 = function() {
  if (this.completed)
    throw new DeferredError("DEFERRED_ALREADY_COMPLETE", __privateGet(this, _id2));
};
_addListener = new WeakSet();
addListener_fn = function(event, listener) {
  const map = __privateGet(_ProgressedDeferred, _listeners).get(this);
  if (!map.has(event))
    map.set(event, []);
  map.get(event).push(listener);
};
__privateAdd(ProgressedDeferred, _listeners, /* @__PURE__ */ new WeakMap());
__privateAdd(ProgressedDeferred, _count2, 0);
__publicField(ProgressedDeferred, _a2, _ProgressedDeferred);
await new ProgressedDeferred().reject("Test");

// src/index.ts
new Deferred().resolve("").resolve("");
export {
  Deferred,
  DeferredError,
  ProgressedDeferred,
  Deferred as default
};
//# sourceMappingURL=index.js.map
