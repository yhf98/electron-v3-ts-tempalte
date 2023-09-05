<!--
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:44
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-15 11:42:59
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\App.vue
 * @Description: APP
-->
<template>
  <router-view />
</template>
<script lang="ts" setup></script>
<style>
:root {
  /** 背景颜色 */
  --theme-bg-color: rgb(47, 50, 65);
  /** 按钮颜色 */
  --theme-btn-color: rgb(159, 234, 249);
  /** 字体颜色 */
  --theme-font-color: rgb(255, 255, 255);
  /** 键盘背景颜色 */
  --theme-key-bg-color: rgb(47, 50, 65);
  /** 屏幕背景颜色 */
  --theme-sreen-bg-color: rgba(255, 255, 255, 0.3);
  /** 键盘按钮颜色 */
  --theme-key-btn-color: rgba(175, 175, 175, 0.2);
  /** 选中颜色 */
  --theme-selected-btn-color: rgba(252, 2, 2, 0.288);
}

*,
input {
  outline: none;
  font-size: 12px;
}

body {
  margin: 0;
  padding: 0;
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate(-5px, 0);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translate(5px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.shake {
  animation: shake 0.5s;
}
</style>
