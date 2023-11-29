import { tinyassert } from "@hiogawa/utils";
import { parentPort } from "node:worker_threads";
import { expose}  from "comlink";
// @ts-ignore
import nodeEndpoint from "comlink/dist/esm/node-adapter.mjs";

tinyassert(parentPort);
const port = parentPort;

export type { MyService };

class MyService {
  ping(data: string) {
    return "pong from worker: " + data;
  }
}

function main() {
  const myService = new MyService();
  expose(myService, nodeEndpoint(port));
}

main();
