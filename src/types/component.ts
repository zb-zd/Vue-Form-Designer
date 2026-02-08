import type { PropConfig } from './propConfig'

/**
 * Component metadata for registry
 */
export interface ComponentMeta {
  type: string
  name: string
  icon: string
  category: 'input' | 'layout' | 'advanced'
  defaultProps: Record<string, any>
  propConfigs: PropConfig[]       // 属性配置定义
}

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
