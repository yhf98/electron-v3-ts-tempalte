/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2022-12-14 10:29:19
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-19 18:39:19
 * @FilePath: \electron-v3-ts-tempalte\preload.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { ipcRenderer } = require('electron')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }

    ipcRenderer.on('devices', (_event, text) => replaceText('devices', text))
})