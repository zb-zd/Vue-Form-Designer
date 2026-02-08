import type { Component } from 'vue'

/**
 * 使用 import.meta.glob 自动加载所有属性组件
 * 命名规则：{PropName}Prop.vue
 * 例如：LabelProp.vue 对应 label 属性
 */
const propModules = import.meta.glob<{ default: Component }>('./*.vue', { eager: true })

/**
 * 属性组件注册表
 * key: 属性名（小写）
 * value: Vue 组件
 */
export const propComponents: Record<string, Component> = {}

// 自动注册所有属性组件
Object.entries(propModules).forEach(([path, module]) => {
  // 从路径中提取文件名：./LabelProp.vue -> LabelProp
  const fileName = path.replace(/^\.\//, '').replace(/\.vue$/, '')

  // 移除 Prop 后缀并转为小写：LabelProp -> label
  if (fileName.endsWith('Prop')) {
    const propName = fileName.replace(/Prop$/, '')
    // 转为小写，支持驼峰命名：ShowWordLimit -> showWordLimit
    const propKey = propName.charAt(0).toLowerCase() + propName.slice(1)

    propComponents[propKey] = module.default
  }
})

/**
 * 获取属性组件
 * @param propName 属性名
 * @returns Vue 组件或 undefined
 */
export function getPropComponent(propName: string): Component | undefined {
  return propComponents[propName]
}

/**
 * 检查属性组件是否存在
 * @param propName 属性名
 * @returns boolean
 */
export function hasPropComponent(propName: string): boolean {
  return propName in propComponents
}

/**
 * 获取所有已注册的属性名
 * @returns 属性名数组
 */
export function getAllPropNames(): string[] {
  return Object.keys(propComponents)
}

// 开发环境下打印已注册的属性组件
if (import.meta.env.DEV) {
  console.log('📦 已注册的属性组件:', getAllPropNames())
}
