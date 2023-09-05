/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-09 14:54:38
 * @LastEditors: yaohengfeng 1921934563@qq.com
 * @LastEditTime: 2022-12-09 18:34:58
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\utils\addEvent.ts
 * @Description: 添加事件-避免重复监听
 */
let delFunc = null;

/**
 * 添加事件
 * @param target 事件添加对象
 * @param eventName 事件名称
 * @param fn 事件处理函数
 */
export default function addEvent(target: any,eventName: string,fn: Function) {
    //此处为关键点：如果这个全局变量不为空，说明当前已经绑定了一个监听，所以需要移除
    target.removeEventListener(eventName, delFunc);
    //此处给该公共参数重新赋值方法
    delFunc = function (e) {
        fn(e);
        target.removeEventListener(eventName, delFunc,false);
    };
    //添加监听，此时添加监听不会出现重复监听的情况
    target.addEventListener(eventName, delFunc,false);
}