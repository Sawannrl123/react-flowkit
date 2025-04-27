import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
  },
  plugins: [
    pluginReact(),
    pluginNodePolyfill({
      globals: {
        Buffer: false,
        process: false,
      },
    }),
  ],
});
