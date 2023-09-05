/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-10 09:21:58
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-29 09:52:26
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\common\Dialog.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import path from "path"

export const createDialog = (url: string, config: any, title: string = "Daptkey", icon: string = ''): Promise<Window> => {
  return new Promise((resolve, reject) => {
    let windowProxy = window.open(`/#/${url}`, "_blank", JSON.stringify(config));
    let readyHandler = (e) => {
      let msg = e.data;
      if (msg["msgName"] === `__dialogReady`) {
        window.removeEventListener("message", readyHandler, false);
        resolve(windowProxy);
        
        windowProxy.document.title = title;

        // FIXME: 设置窗口图标ico
        // console.info("Path: ", `${path.join(path.dirname(process.execPath), "favicon", icon)}.ico`.replaceAll("\\", "/"));
        // var faviconLink = document.createElement("link");
        // // <link rel="icon" href="path/to/favicon.ico" type="image/x-icon">
        // faviconLink.rel = "icon";
        // faviconLink.type="image/x-icon";
        // faviconLink.href = `https://angular001.oss-cn-beijing.aliyuncs.com/favicon.ico`;
        // windowProxy.document.head.appendChild(faviconLink);
      }
    };

    window.addEventListener("message", readyHandler, false);
  });
};
export const dialogReady = () => {
  let msg = { msgName: `__dialogReady` };
  window.opener.postMessage(msg);
};
