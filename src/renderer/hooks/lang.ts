/*
 * @Author: yaohengfeng 1921934563@qq.com
 * @Date: 2022-12-09 10:21:42
 * @LastEditors: 姚恒锋 1921934563@qq.com
 * @LastEditTime: 2023-08-15 12:09:38
 * @FilePath: \electron-v3-ts-tempalte\src\renderer\hooks\loacle.ts
 * @Description: lang-hooks
 */
import { useI18n } from 'vue-i18n';
import { computed } from "vue";
import { setItem } from '../../db/electron-store';

export default function useLocale() {
  const i18 = useI18n()
  //返回当前的语言
  const currentLocale = computed(() => {
    return i18.locale.value
  })
  //切换语言
  const changeLocale = async (value: string) => {
    i18.locale.value = value;
    setItem('lang', value);

    // TODO: 全面改用electron-store
    localStorage.setItem('lang', value);
  };
  return {
    currentLocale,
    changeLocale,
    t: i18.t
  }
}
