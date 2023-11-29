import { Worker } from "node:worker_threads";
import {wrap} from "comlink";
import { MyService } from "./worker-entry";
import nodeEndpoint from "comlink/dist/umd/node-adapter";

export const workerProxy = memoizeGlobal("workerProxy", initWorkerProxy);

function initWorkerProxy() {
  const worker = new Worker("./dist/worker-entry.js");
  return wrap<MyService>(nodeEndpoint(worker))
}

function memoizeGlobal<T>(key: string, init: () => T): T {
  return ((globalThis as any)[key] ??= init());
}
