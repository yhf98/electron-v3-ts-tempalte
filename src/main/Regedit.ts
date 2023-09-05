/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-08-16 10:21:50
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-22 13:36:30
 * @FilePath: \electron-v3-ts-tempalte\src\main\Regedit.ts
 * @Description: 注册表
 */
import { app, BrowserWindow } from "electron";
import path from "path";
const { exec, execSync } = require("child_process");
// const log = require("electron-log");

// console.info = log.info;
// console.error = log.error;
// console.error = log.error;
export class Regedit {
  static register(mainWindow: BrowserWindow): void{
    // TODO: 应用启动添加注册表
    console.info("Add Regedit：");
    const appName = app.name;
    const customExtension = ".dapt";
    let appPath = path.dirname(process.execPath);

    let configPath = process.argv[2] || "";
    console.info("App args: ", JSON.stringify(process.argv));
    console.info("App lunach: ",appName, process.execPath, configPath);
    app.setAsDefaultProtocolClient(appName, process.execPath, [configPath]);

    // 注册文件关联（这里使用了假设的文件类型和图标）
    const fileAssociation = {
      ext: customExtension,
      name: appName,
      description: "Dapykey",
      iconPath: path.resolve(appPath, "icons", "icon.ico"),
      appPath: process.execPath,
    };

    exec(`REG ADD HKCU\\Software\\Classes\\${fileAssociation.ext} /ve /d "${fileAssociation.name}" /f`, (err) => {
      if (err) {
        console.error("Failed to add registry key:", err);
      }
    });

    exec(`REG ADD HKCU\\Software\\Classes\\${fileAssociation.ext}\\DefaultIcon /ve /d "${fileAssociation.iconPath}",0 /f`, (err) => {
      if (err) {
        console.error("Failed to add registry key:", err);
      }
    });

    exec(`REG ADD HKCU\\Software\\Classes\\${fileAssociation.ext}\\shell\\open\\command /ve /d "\"${fileAssociation.appPath}\" \"%2\"" /f`, (err) => {
      if (err) {
        console.error("Failed to add registry key:", err);
      }
    });
    console.info("Regedit sucessfully added");
    // if(configPath && configPath.length > 3 && configPath.endsWith("dapt")) {
    //   // 打开配置文件
    //   setTimeout(()=> {
    //     mainWindow.webContents.send('open-file', configPath);
    //   }, 800);
    // }
    // try {
    //   // 注册文件关联，并将应用程序路径写入注册表
    //   execSync(`assoc ${customExtension}=${appName}`);
    //   execSync(`ftype ${appName}=${appPath} "%1"`);
    //   console.info("写入注册表成功！");
    // } catch (error) {
    //   console.error("写入注册表失败：Error creating file association:", error);
    // }
  }
}
