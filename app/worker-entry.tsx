import { tinyassert } from "@hiogawa/utils";
import { parentPort } from "node:worker_threads";

tinyassert(parentPort);
const port = parentPort;

// minimal copy from https://github.com/hi-ogawa/js-utils/blob/c55125e585d721fd34442e40a57b56f394fedd01/packages/tiny-rpc/src/adapter-message-port.ts
export interface RequestPayload {
  id: string;
  data: string;
}

export interface ResponsePayload {
  id: string;
  data: string;
}

function main() {
  port.on("message", (req: RequestPayload) => {
    const res: ResponsePayload = {
      id: req.id,
      data: "pong from worker: " + req.data,
    };
    port.postMessage(res);
  });
}

main();
