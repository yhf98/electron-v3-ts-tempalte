/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-08-14 14:39:58
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-15 11:07:03
 * @FilePath: \electron-v3-ts-tempalte\src\main\Updater.ts
 * @Description: 自动检测更新
 */
import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import i18next from "i18next";

export class Updater {
  static check() {
    autoUpdater.checkForUpdates();
    autoUpdater.on("update-downloaded", async () => {
      await dialog.showMessageBox({
        message: i18next.t("index.hasUpdate"),
      });
      autoUpdater.quitAndInstall();
    });
  }
}
