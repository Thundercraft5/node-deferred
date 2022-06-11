# node-deferred
`node-deferred` is a library that provides a promise with additional functionality such as state querying, and external resolving/rejecting.

# Usage
Import `Deferred` or `ProgressableDeferred` for progress notification functionality.
```js
import Deferred from "@thundercraft5/node-deferred";

const def = new Deferred();

def.resolve("Test");
await def; // "Test"
```