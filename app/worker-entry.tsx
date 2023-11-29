import { tinyassert } from "@hiogawa/utils";
import { parentPort } from "node:worker_threads";
import { expose}  from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";

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
