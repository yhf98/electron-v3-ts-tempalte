/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-02 18:19:50
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 10:39:40
 * @FilePath: \electron-v3-ts-tempalte\plugins\buildPlugin.ts
 * @Description: 打包exe 配置
 */
import path from "path";
import fs from "fs-extra";

class BuildObj {
  buildMain() {
    require("esbuild").buildSync({
      entryPoints: ["./src/main/mainEntry.ts"],
      bundle: true,
      platform: "node",
      minify: true,
      outfile: "./dist/mainEntry.js",
      external: ["electron",'ffi-napi', 'ref-napi'],
    });
  }
  preparePackageJson() {
    let pkgJsonPath = path.join(process.cwd(), "package.json");
    let localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    let preloadJS = fs.readFileSync(path.join(process.cwd(), "preload.js"), "utf-8");
    let electronConfig = localPkgJson.devDependencies.electron.replace("^", "");
    localPkgJson.main = "mainEntry.js";
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    localPkgJson.devDependencies = { electron: electronConfig };
 
    let tarJsonPath = path.join(process.cwd(), "dist", "package.json");
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));
    fs.writeFileSync(path.join(process.cwd(), "dist", "preload.js"), preloadJS);
    fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"));
  }
  buildInstaller() {
    let options = {
      config: {
        directories: {
          output: path.join(process.cwd(), "release"),
          app: path.join(process.cwd(), "dist"),
        },
        files: ["**"],
        extends: null,
        productName: "ElecV3Ts",
        appId: "com.aikezc.electron",
        asar: true,
        nsis: {
          "oneClick": false,
          "allowToChangeInstallationDirectory": true,
          "perMachine": false,
          "allowElevation": true,
          "installerIcon": "./release/icons/icon.ico",
          "uninstallerIcon": "./release/icons/uninstall.ico",
          "installerHeaderIcon": "./release/icons/icon.ico",
          "createDesktopShortcut": true,
          "createStartMenuShortcut": true,
          "runAfterFinish": true,
          "shortcutName": "ElecV3Ts"
        },
        publish: [{ provider: "generic", url: "https://pagers.oss-cn-beijing.aliyuncs.com/" }],
        "mac": {
          "icon": "release/icons/icon.icns"
        },
        "win": {
          "icon": "release/icons/256x256.png"
        },
        "linux": {
          "icon": "release/icons"
        },
        extraResources: [
          {
            "from": "release/lang",
            "to": "../lang"
          },
          {
            "from": "release/icons",
            "to": "../icons"
          },
          {
            "from": "release/favicon",
            "to": "../favicon"
          }
        ],
      },
      project: process.cwd(),
    };
    return require("electron-builder").build(options);
  }
}

export let buildPlugin = () => {
  return {
    name: "build-plugin",
    closeBundle: () => {
      let buildObj = new BuildObj();
      buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.buildInstaller();
    },
  };
};
