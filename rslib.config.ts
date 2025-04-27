import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
  lib: [
    {
      bundle: true,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
    cleanDistPath: true,
    minify: true,
    sourceMap: true,
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
