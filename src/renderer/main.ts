/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-08 14:02:45
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 10:32:53
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\main.ts
 * @Description: 初始化Vue 实例
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "element-plus/dist/index.css";
import "./assets/style.css";
import "./assets/icon/iconfont.css";
import App from "./App.vue";
import BarTop from "./components/BarTop.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import i18n from "../lang";

const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.component("BarTop", BarTop);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
