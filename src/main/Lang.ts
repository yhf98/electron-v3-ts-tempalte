/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-08-15 09:48:24
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-25 15:11:27
 * @FilePath: \electron-v3-ts-tempalte\src\main\Lang.ts
 * @Description: Electron 语言配置
 */
import { BrowserWindow, ipcRenderer } from "electron";
import i18next from "i18next";
const path = require("path");
const { readJsonSync } = require("fs-extra");

import { Menus } from "./Menus";

import { getItem, setItem } from "../db/electron-store";

// 系统语言初始化
let lang = getItem("lang");
if (!lang) {
  lang = setItem("lang", "en-US");
}

export class Lang {
  private static _mainWindow: BrowserWindow;
  static init(mainWindow: BrowserWindow) {
   
    let langPath = path.dirname(process.execPath);
    console.info("Language Path: ", langPath);

    let zh = readJsonSync(path.join(langPath, "lang", "zh-CN.json"));
    let en = readJsonSync(path.join(langPath, "lang", "en-US.json"));
    this._mainWindow = mainWindow;
    i18next.init({
      lng: lang,
      debug: true,
      resources: {
        en: {
          translation: en
        },
        zh: {
          translation: zh
        },
      },
    });
  }

  static switchLanguage(lang: string): void {
    i18next.changeLanguage(lang, (err, t) => {
      if (err) console.error(err);
      setItem("lang", lang);
      this._mainWindow.webContents.send("switchLang", lang);

      // 重新加载菜单列表
      Menus.init(null);
    });
  }
}
