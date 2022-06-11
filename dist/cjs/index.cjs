var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Deferred: () => Deferred,
  ProgressedDeferred: () => ProgressedDeferred,
  default: () => Deferred
});
module.exports = __toCommonJS(src_exports);

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
      executor.call(this, __privateGet(this, _resolve), __privateGet(this, _reject));
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
    throw new TypeError("The Deferred has already been completed.");
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
    if (typeof executor === "function")
      executor.call(this, this.progress.bind(this), this.resolve.bind(this), this.reject.bind(this));
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
    throw new TypeError("The Deferred has already been completed.");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Deferred,
  ProgressedDeferred
});
//# sourceMappingURL=index.cjs.map
