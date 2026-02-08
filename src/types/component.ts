import type { ComponentConfig } from './componentConfig'

/**
 * Component metadata for registry
 * 现在直接使用 ComponentConfig 类型
 */
export type ComponentMeta = ComponentConfig

/**
 * Component instance on canvas
 */
export interface ComponentNode {
  id: string
  type: string
  props: Record<string, any>
  position?: {
    x: number
    y: number
  }
}

/**
 * Component property definition
 */
export interface ComponentProp {
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select'
  defaultValue: any
  options?: Array<{ label: string; value: any }>
}
