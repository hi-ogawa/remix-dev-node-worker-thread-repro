import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["app/worker-entry.tsx"],
  format: ["cjs"],
  platform: "node",
  noExternal: [/.*/]
})
