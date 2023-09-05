/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-08-15 09:48:24
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-22 11:40:08
 * @FilePath: \electron-v3-ts-tempalte\src\main\Lang.ts
 * @Description: 菜单配置
 */
import { BrowserWindow, Menu, app } from "electron";
import i18next from "i18next";
import path from "path";
import fs from "fs-extra";
// const log = require("electron-log");

// console.info = log.info;

import { Lang } from "./Lang";
import { getItem, setItem } from "../db/electron-store";
export class Menus {
  private static _mainWindow: BrowserWindow;
  static init(mainWindow: BrowserWindow | null) {
    if (mainWindow) this._mainWindow = mainWindow;

    const template: Array<Electron.MenuItemConstructorOptions | Electron.MenuItem> = [
      {
        label: i18next.t("menu.file.title"),
        submenu: [
          {
            label: i18next.t("menu.file.newFile"),
            accelerator: "Ctrl+N",
            click: async () => {
              this._mainWindow.webContents.send("newFile", "");
            },
          },
          {
            label: i18next.t("menu.file.openFile"),
            accelerator: "Ctrl+O",
            click: async () => {
              this._mainWindow.webContents.send("openFile", "");
            },
          },
          {
            label: i18next.t("menu.file.saveFile"),
            accelerator: "Ctrl+S",
            click: async () => {
              this._mainWindow.webContents.send("saveFile", "");
            },
          },
          {
            label: i18next.t("menu.file.saveASFile"),
            accelerator: "Ctrl+Shift+S",
            click: async () => {
              this._mainWindow.webContents.send("saveAndRename", "");
            },
          },
          {
            label: i18next.t("menu.file.recentdocuments"),
            submenu: [
              {
                label: "Clear Recent",
                role: "clearRecentDocuments",
              },
            ],
          },
          { type: "separator" },
          {
            label: i18next.t("menu.file.devTools"),
            role: "toggleDevTools",
          },
          {
            label: i18next.t("menu.file.fullScreen"),
            role: "togglefullscreen",
          },
          {
            label: i18next.t("menu.file.reload"),
            role: "reload",
          },
          {
            label: i18next.t("menu.file.exit"),
            role: "quit",
            accelerator: "Ctrl+Q",
          },
        ],
      },
      {
        label: i18next.t("menu.language.title"),
        submenu: [
          {
            label: i18next.t("menu.language.zh"),
            type: "radio",
            checked: getItem("lang") == "zh-CN",
            accelerator: "Ctrl+Shift+Z",
            click: async () => {
              Lang.switchLanguage("zh-CN");
            },
          },
          {
            label: "English",
            type: "radio",
            checked: getItem("lang") == "en-US",
            accelerator: "Ctrl+Shift+E",
            click: async () => {
              Lang.switchLanguage("en-US");
            },
          },
        ],
      },
      {
        label: i18next.t("menu.theme.title"),
        submenu: [
          {
            label: i18next.t("menu.theme.dark"),
            type: "radio",
            checked: getItem("theme") == "dark",

            accelerator: "Ctrl+Shift+D",
            click: async () => {
              setItem("theme", "dark");
              this._mainWindow.webContents.send("changeTheme", "dark");
            },
          },
          {
            label: i18next.t("menu.theme.light"),
            type: "radio",
            accelerator: "Ctrl+Shift+L",
            checked: getItem("theme") == "light",
            click: async () => {
              setItem("theme", "light");
              this._mainWindow.webContents.send("changeTheme", "light");
            },
          },
        ],
      },

      {
        label: i18next.t("menu.help.title"),
        role: "help",
        submenu: [
          {
            label: i18next.t("menu.help.about"),
            role: "about",
          },
        ],
      },
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // let appPath = path.dirname(process.execPath);
    // console.info("启动配置：", appPath);
    // let pkgJsonPath = path.join(appPath, "package.json");
    // let data: any = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));

    app.setAboutPanelOptions({
      applicationName: `ElecV3Ts-0.0.1`,
      copyright: `https://blog.aikezc.com`,
    });
  }

  static changeTheme(theme: string): void {
    this._mainWindow.webContents.send("changeTheme", theme);
  }
}
