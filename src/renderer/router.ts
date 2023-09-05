/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-09 09:33:54
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-09-05 10:23:54
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\router.ts
 * @Description: 路由配置
 */
import * as VueRouter from "vue-router";

export let router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/Index" },
    {
      path: "/Index",
      component: () => import("./window/Home.vue"),
    },
    {
      path: "/SubWindow",
      component: () => import("./window/SubWindow.vue"),
    },
  ],
});
