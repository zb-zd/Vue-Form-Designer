import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

/**
 * 创建 i18n 实例
 */
export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en-US', // 回退语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

/**
 * 获取属性标签的翻译
 * @param propName 属性名
 * @returns 翻译后的标签
 */
export function getPropLabel(propName: string): string {
  const key = `props.${propName}`
  const translated = i18n.global.t(key)

  // 如果翻译不存在，返回原始属性名
  return translated === key ? propName : translated
}
