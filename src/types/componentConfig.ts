/**
 * 组件配置
 * 完全自动化：从 defaultProps 自动推断属性配置
 */
export interface ComponentConfig {
  type: string                    // 组件类型
  name: string                    // 组件名称
  icon: string                    // 图标
  category: 'input' | 'layout' | 'advanced'
  defaultProps: Record<string, any>  // 默认属性值（自动匹配对应的 Prop 组件）
  isContainer?: boolean           // 是否为容器组件（可包含子组件）
}
