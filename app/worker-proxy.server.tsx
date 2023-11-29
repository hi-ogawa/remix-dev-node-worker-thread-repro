import { Worker } from "node:worker_threads";
import type { RequestPayload, ResponsePayload } from "./worker-entry";

export const workerProxy = memoizeGlobal("workerProxy", initWorkerProxy);

function initWorkerProxy() {
  const worker = new Worker("./dist/worker-entry.js");

  // minimal copy from https://github.com/hi-ogawa/js-utils/blob/c55125e585d721fd34442e40a57b56f394fedd01/packages/tiny-rpc/src/adapter-message-port.ts
  return {
    ping: (data: string) => {
      const req: RequestPayload = {
        id: Math.random().toString(36).slice(2),
        data,
      };
      return new Promise<string>((resolve, reject) => {
        const handler = (res: ResponsePayload) => {
          if (res.id === req.id) {
            resolve(res.data);
            worker.removeListener("message", handler);
          }
        };
        worker.addListener("message", handler);
        worker.postMessage(req);
      });
    },
  };
}

function memoizeGlobal<T>(key: string, init: () => T): T {
  return ((globalThis as any)[key] ??= init());
}
