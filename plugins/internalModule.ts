/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:44
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-15 11:30:15
 * @FilePath: \electron-v3-ts-tempalte\plugins\internalModule.ts
 * @Description: 内部模块
 */
import fs from "fs-extra";
class InternalModule {
  private internals: { name: string; code: string }[] = [];
  getAlias() {
    let result = [];
    for (let obj of this.internals) {
      result.push({
        find: obj.name,
        replacement: `./node_modules/non.exist/${obj.name}.non.exist.js`,
      });
    }
    return result;
  }
  createFile() {
    fs.ensureDirSync("./node_modules/non.exist");
    for (let obj of this.internals) {
      if (!fs.existsSync(obj.name)) {
        fs.writeFileSync(obj.name, obj.code);
      }
    }
  }
  constructor() {
    let modules = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url"];
    for (let m of modules) {
      let code = `const ${m} = require('${m}');export { ${m} as default }`;
      this.internals.push({ name: m, code });
    }
    let electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"].join(",");
    let code = `const {${electronModules}} = require('electron');export {${electronModules}}`;
    this.internals.push({ name: `electron`, code });
    this.createFile();
  }
}
export let internalModule = new InternalModule();
