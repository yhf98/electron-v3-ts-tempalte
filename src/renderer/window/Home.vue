<!--
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:44
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 10:25:09
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\window\Home.vue
 * @Description: 主页面
-->
<script setup lang="ts">
import { createDialog } from "../common/Dialog";
import addEvent from "../utils/addEvent";
import useLocale from "../hooks/lang";
import { setTheme } from "../utils/theme";

import { onMounted, nextTick } from "vue";
const { ipcRenderer } = require("electron");

const { changeLocale, t } = useLocale();

/**
 * 打开子窗口
 */
const openSubWindowHandle = async (index) => {
  let sendMsg = {
    key: "dataMsg",
    value: {
      msg: "来自父窗口的数据："
    },
  };

  let config = { modal: true, width: 700, height: 720, webPreferences: { webviewTag: true } };
  let dialog = await createDialog(`SubWindow`, config, t("index.rotateButtonEditor"), "btn");

  addEvent(window, "message", (e) => {
    if (e && e.data?.msgName != "__dialogReady") {
      const command = JSON.parse(e.data);

      console.info("接收到子窗口返回的数据：", command);
    }
  });

  // 发送数据给子窗口
  dialog.postMessage(JSON.stringify(sendMsg));
};


/**
 * 监听主线程消息
 */
const ipcRendererHandler = () => {
  let ipcEvents: Array<{ eventName: string; handle: Function }> = [
    {
      eventName: "switchLang",
      handle: changeLocale,
    },
    {
      eventName: "changeTheme",
      handle: setTheme,
    }
  ];
  ipcEvents.forEach((event) => {
    ipcRenderer.on(event.eventName, (e, data, obj) => {
      event.handle(data);
    });
  });
};

onMounted(() => {
  // 显示窗口
  ipcRenderer.invoke("showWindow");

  nextTick(() => {
    // 监听主线程消息
    ipcRendererHandler();
  });
});

</script>

<template>
  <div>
    <h1>V3-TS-Electron</h1>
    <div><el-button @click="openSubWindowHandle">打开子窗口</el-button></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: var(--theme-bg-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--theme-font-color);
}
</style>
