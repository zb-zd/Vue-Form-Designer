import type { ComponentConfig } from '@/types/componentConfig'

/**
 * 行容器组件配置
 */
export const rowConfig: ComponentConfig = {
  type: 'row',
  name: '行容器',
  icon: 'Grid',
  category: 'layout',
  isContainer: true,
  defaultProps: {
    gutter: 0,
    justify: 'start',
    align: 'top'
  }
}

/**
 * 列容器组件配置
 */
export const colConfig: ComponentConfig = {
  type: 'col',
  name: '列容器',
  icon: 'Menu',
  category: 'layout',
  isContainer: true,
  defaultProps: {
    span: 12,
    offset: 0
  }
}

/**
 * 面板容器组件配置
 */
export const panelConfig: ComponentConfig = {
  type: 'panel',
  name: '面板容器',
  icon: 'Document',
  category: 'layout',
  isContainer: true,
  defaultProps: {
    title: '分组容器',
    shadow: 'hover'
  }
}

/**
 * 栅格容器组件配置
 */
export const gridConfig: ComponentConfig = {
  type: 'grid',
  name: '栅格容器',
  icon: 'Grid',
  category: 'layout',
  isContainer: true,
  defaultProps: {
    cols: 2,
    gutter: 16,
    justify: 'start',
    align: 'top'
  }
}

/**
 * 所有布局组件配置
 */
export const layoutComponents = [
  gridConfig,
  rowConfig,
  colConfig,
  panelConfig
]
