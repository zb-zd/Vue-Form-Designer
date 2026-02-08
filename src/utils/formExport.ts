import type { ComponentNode } from '@/types'

/**
 * 表单 Schema 定义
 */
export interface FormSchema {
  version: string
  name: string
  description?: string
  fields: ComponentNode[]
  createdAt: string
}

/**
 * 导出表单为 JSON Schema
 */
export function exportFormSchema(components: ComponentNode[]): FormSchema {
  return {
    version: '1.0.0',
    name: '表单模板',
    description: '通过表单设计器生成',
    fields: components,
    createdAt: new Date().toISOString()
  }
}

/**
 * 下载 JSON 文件
 */
export function downloadJSON(data: any, filename: string = 'form-schema.json') {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * 导入表单 Schema
 */
export function importFormSchema(jsonStr: string): ComponentNode[] {
  try {
    const schema = JSON.parse(jsonStr) as FormSchema
    return schema.fields || []
  } catch (error) {
    console.error('导入表单失败:', error)
    return []
  }
}
