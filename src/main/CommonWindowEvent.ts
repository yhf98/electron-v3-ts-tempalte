/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:44
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 10:52:18
 * @FilePath: \electron-v3-ts-tempalte\src\main\CommonWindowEvent.ts
 * @Description: 窗口事件
 */
import { BrowserWindow, Menu, ipcMain, app, dialog } from "electron";
import IMessage from "../interface/IMessage";

export class CommonWindowEvent {
  private static getWin(event: any) {
    return BrowserWindow.fromWebContents(event.sender);
  }
  public static listen() {
    ipcMain.handle("minimizeWindow", (e) => {
      this.getWin(e)?.minimize();
    });

    ipcMain.handle("maxmizeWindow", (e) => {
      this.getWin(e)?.maximize();
    });

    ipcMain.handle("unmaximizeWindow", (e) => {
      this.getWin(e)?.unmaximize();
    });

    ipcMain.handle("hideWindow", (e) => {
      this.getWin(e)?.hide();
    });

    ipcMain.handle("showWindow", (e) => {
      this.getWin(e)?.show();
    });

    ipcMain.handle("closeWindow", (e) => {
      this.getWin(e)?.close();
    });
    ipcMain.handle("resizable", (e) => {
      return this.getWin(e)?.isResizable();
    });
    ipcMain.handle("getPath", (e, name: any) => {
      return app.getPath(name);
    });
    ipcMain.handle("getPathSync", async (e, name: any) => {
      return await app.getPath(name);
    });

    ipcMain.on("selectPath", (e, name: any) => {
      dialog
        .showOpenDialog(this.getWin(e), {
          properties: ["openFile"],
        })
        .then((result) => {
          console.log(result.canceled);
          console.log(result.filePaths);
          e.returnValue = result.filePaths;
        })
        .catch((err) => {
          console.log(err);
          e.returnValue = null;
        });
    });

    ipcMain.on("saveAndRename", (e, name: any) => {
      let result = dialog.showSaveDialogSync(this.getWin(e), {
        properties: ["createDirectory"],
        filters: [{ name: "dapt", extensions: ["dapt"] }],
      });
      e.returnValue = result;
    });

    ipcMain.on("openDaptFile", (e, name: any) => {
      let result = dialog.showOpenDialogSync(this.getWin(e), {
        properties: ["openFile"],
        filters: [{ name: "dapt", extensions: ["dapt"] }],
      });
      if (result && result?.length > 0) {
        e.returnValue = result[0];
      } else {
        e.returnValue = null;
      }
    });

    ipcMain.on("selectDir", (e, name: any) => {
      dialog
        .showOpenDialog(this.getWin(e), {
          properties: ["openDirectory"],
        })
        .then((result) => {
          console.log(result.canceled);
          console.log(result.filePaths);
          e.returnValue = result.filePaths;
        })
        .catch((err) => {
          console.log(err);
          e.returnValue = null;
        });
    });

    ipcMain.on("getAppPath", (e, name: any) => {
      e.returnValue = app.getAppPath();
    });

    ipcMain.on("getExePath", (e, name: any) => {
      e.returnValue = app.getPath(name);
    });

    ipcMain.on("showErrorBox", (e, name: any) => {
      dialog.showErrorBox("你好", "通知!!");
    });

    ipcMain.on("showBox", (e, box: IMessage) => {
      let choose = dialog.showMessageBoxSync(this.getWin(e), {
        title: box.title,
        message: box.message,
        type: box.type,
        buttons: box.buttons,
        defaultId: 0,
        cancelId: 1,
      });
      e.returnValue = choose;
    });

    ipcMain.on("show-context-btn-menu", (event, args) => {
      console.log("args", args);
      const { index, isBtn, delImg, updateImg } = args;
      let template = [
        {
          label: delImg,
          click: () => {
            event.sender.send("context-btn-menu-command", {
              event: "delBtnImg",
              index,
              isBtn,
            });
          },
        },
        {
          label: updateImg,
          click: () => {
            event.sender.send("context-btn-menu-command", {
              event: "updateBtnImg",
              index,
              isBtn,
            });
          },
        },
      ];

      const menu = Menu.buildFromTemplate(template);
      menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
    });

    ipcMain.on("addRecentDocument", (e, arg) => {
      console.info("最近打开文件：", arg);
      app.addRecentDocument(arg);
    });
  }
  public static regWinEvent(win: BrowserWindow) {
    win.on("maximize", () => {
      win.webContents.send("windowMaximized");
    });
    win.on("unmaximize", () => {
      win.webContents.send("windowUnmaximized");
    });
    //@ts-ignore
    win.webContents.setWindowOpenHandler((param) => {
      let config = {
        frame: true,
        show: true,
        parent: null,
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
        },
      };
      let features = JSON.parse(param.features);
      for (let p in features) {
        if (p === "webPreferences") {
          for (let p2 in features.webPreferences) {
            config.webPreferences[p2] = features.webPreferences[p2];
          }
        } else {
          config[p] = features[p];
        }
      }
      //@ts-ignore
      if (config["modal"] === true) config.parent = win;
      return { action: "allow", overrideBrowserWindowOptions: config };
    });

    // win.webContents.openDevTools({ mode: "bottom" });
    win.setMenuBarVisibility(false);
  }
}
