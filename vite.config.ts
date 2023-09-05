/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-02 18:19:50
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-22 09:37:31
 * @FilePath: \electron-jue-jin\vite.config.ts
 * @Description: vite 配置文件
 */
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { devPlugin } from "./plugins/devPlugin";
import optimizer from "vite-plugin-optimizer";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { buildPlugin } from "./plugins/buildPlugin";
let getReplacer = () => {
  let externalModels = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url", "better-sqlite3", "knex"];
  let result = {};
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
export default defineConfig({
  plugins: [
    optimizer(getReplacer()),
    devPlugin(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    
  ],
  build: {
    assetsInlineLimit: 0,
    minify: false,
    rollupOptions: {
      plugins: [buildPlugin()],
    },
  },
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
});
