/*
 * @Author: 姚恒锋 1921934563@qq.com
 * @Date: 2023-09-05 11:02:32
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 11:04:13
 * @FilePath: \electron-v3-ts-tempalte\lang.js
 * @Description: 拷贝lang文件
 */
const fs = require('fs');
const path = require('path');

function copyFolderSync(source, target) {
  // 创建目标文件夹
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // 获取源文件夹中的所有文件和子文件夹
  const files = fs.readdirSync(source);

  // 遍历源文件夹中的所有文件和子文件夹
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    // 判断当前遍历到的是文件夹还是文件
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // 如果是文件夹，则递归调用 copyFolderSync() 函数
      copyFolderSync(sourcePath, targetPath);
    } else {
      // 如果是文件，则进行文件复制
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

// 调用示例
const sourceFolder = './release/lang';
const targetFolder = './node_modules/electron/dist/lang';
copyFolderSync(sourceFolder, targetFolder);