/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:44
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-18 14:05:48
 * @FilePath: \electron-v3-ts-tempalte\plugins\devPlugin.ts
 * @Description: 开发插件
 */
import { ViteDevServer } from "vite";
import fs from "fs-extra";
export let devPlugin = () => {
  return {
    name: "dev-plugin",
    load(id: string): string {
      if (id.endsWith(".non.exist.js")) {
        return fs.readFileSync(id).toString("utf8");
      }
    },
    configureServer(server: ViteDevServer) {
      require("esbuild").buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });
      server.httpServer.once("listening", () => {
        let { spawn } = require("child_process");
        let electronProcess = spawn(require("electron").toString(), ["./dist/mainEntry.js", `http://localhost:${server.config.server.port}`], {
          cwd: process.cwd(),
          stdio: "inherit",
        });
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};
