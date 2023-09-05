/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-10 17:27:43
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-14 15:08:10
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\interface\IMessage.ts
 * @Description: Imessage interface 约束弹窗数据定义
 */
export default interface IMessage {
    title: string,
    type : "error" | "none" | "info" | "question" | "warning",
    message: string;
    buttons: string[]
}