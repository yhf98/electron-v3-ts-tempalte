/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:44
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 10:51:45
 * @FilePath: \electron-v3-ts-tempalte\src\main\mainEntry.ts
 * @Description: 主进程
 */
import { app, BrowserWindow } from "electron";
const path = require("path");
// const log = require("electron-log");

import { CustomScheme } from "./CustomScheme";
import { Updater } from "./Updater";
import { Lang } from "./Lang";
import { Menus } from "./Menus";
import { Regedit } from "./Regedit";

import { CommonWindowEvent } from "./CommonWindowEvent";

// 关闭警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

// 禁用当前应用程序的硬件加速
// app.disableHardwareAcceleration();

// 主窗口
let mainWindow: BrowserWindow;

// 当窗口注册完成时，自动注册窗口事件
app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});

app.on("window-all-closed", () => {
  // 卸载HID监听
  // HID.uninstalled();
  app.quit();
});
// app.on('open-file', (e, url) => {
//   event.preventDefault();
//   mainWindow.webContents.send('open-file', url);

//   console.log("Open dapt file：", url);
// })
// app.on('open-url', (e, url) => {
//   console.log("Open dapt file：", url);
//   mainWindow.webContents.send('open-file', url);
// })

// 主程序初始化
app.whenReady().then(() => {
  let config = {
    width: 995,
    height: 850,
    frame: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: true,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,  
      nativeWindowOpen: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  };

  mainWindow = new BrowserWindow(config);
  // 主窗口显示菜单栏
  mainWindow.setMenuBarVisibility(true);

  // 开发者调试工具【底部】
  // mainWindow.webContents.openDevTools({ mode: "bottom" });

  // 开发环境
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    // 生成环境
    CustomScheme.registerScheme();
    mainWindow.loadURL("app://index.html");
    
    // Product： 检查更新
    // Updater.check();
  }

  // 注册监听
  CommonWindowEvent.listen();
  // 注册HID设备
  // HID.register(mainWindow);
  // 初始化语言
  Lang.init(mainWindow);
  // 菜单初始化
  Menus.init(mainWindow);
  // 注册表
  // Regedit.register(mainWindow);

  // 开启监听器，轮询设备状态
  // timer = setInterval(() => {
  //   mainWindow.webContents.send("devices", "");
  // }, 2000);
});
