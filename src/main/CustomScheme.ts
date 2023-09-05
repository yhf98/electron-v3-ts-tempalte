/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-08-14 14:38:12
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-18 13:49:46
 * @FilePath: \electron-v3-ts-tempalte\src\main\CustomScheme.ts
 * @Description: 自定义协议
 */
import { protocol } from "electron";
import fs from "fs";
import path from "path";

let schemeConfig = { standard: true, secure: true, supportFetchAPI: true, bypassCSP: true, corsEnabled: true, stream: true };
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: schemeConfig }]);

export class CustomScheme {
  private static getMimeType(extension: string) {
    let mimeType = "";
    if (extension === ".js") {
      mimeType = "text/javascript";
    } else if (extension === ".html") {
      mimeType = "text/html";
    } else if (extension === ".css") {
      mimeType = "text/css";
    } else if (extension === ".svg") {
      mimeType = "image/svg+xml";
    } else if (extension === ".json") {
      mimeType = "application/json";
    }
    return mimeType;
  }

  static registerScheme() {
    protocol.registerStreamProtocol("app", (request, callback) => {
      let pathName = new URL(request.url).pathname;
      if (pathName === "/") pathName = "index.html";
      
      let extension = path.extname(pathName).toLowerCase();
      let tarFile = path.join(__dirname, pathName);

      callback({
        statusCode: 200,
        headers: { "content-type": this.getMimeType(extension) },
        data: fs.createReadStream(tarFile),
      });
    });
  }
}
