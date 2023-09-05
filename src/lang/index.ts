/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-09 10:18:11
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-19 09:53:01
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\lang\index.ts
 * @Description: 语言配置
 */
import { ipcRenderer } from "electron";
import { createI18n } from 'vue-i18n'
const { readJsonSync } = require('fs-extra')
const path = require('path')

// import en from './en';
// import cn from './zh';

//设置项目所需语言
export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

// 获取缓存 设置初始化语言
const defaultLocale = localStorage.getItem('lang') || 'zh-CN';

// let rootPath = "H:/daptkey-ts-v3/src/renderer/lang/JSON"
// let fileList = readdirSync(rootPath);
// console.info("文件列表：", fileList)
// let messages: object = {};

// fileList.forEach(file => {
//   let fileName = file.split('.json')[0];
//   if(fileName && fileName.length > 0){
//     messages[fileName] = readJsonSync(path.join(rootPath, file));
//   }
// });

// let langPath = await ipcRenderer.invoke("getPathSync", "exe");

let langPath = path.dirname(process.execPath);

let zh = readJsonSync(path.join(langPath, "lang", "zh-CN.json"));
let en = readJsonSync(path.join(langPath, "lang", "en-US.json"));   

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    "zh-CN": zh,
    "en-US": en
  }
});

export default i18n;

