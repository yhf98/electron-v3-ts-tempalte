/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-08-14 17:33:56
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 09:44:19
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\db\electron-store\index.ts
 * @Description: Electron-Store
 */

const Store = require('electron-store');
const store = new Store();

export function setItem(key: string, value: string | number | boolean): any {
    store.set(key, value);
    return store.get(key) || null;
}

export function getItem(key: string): any {
    return store.get(key) || null;
}