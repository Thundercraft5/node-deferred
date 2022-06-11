import Deferred from "@thundercraft5/node-deferred";

const def = new Deferred();

def.resolve("Test");
await def; // "Test"