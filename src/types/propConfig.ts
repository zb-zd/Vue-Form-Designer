/**
 * 属性配置项类型
 */
export type PropConfigType =
  | 'input'           // 文本输入
  | 'number'          // 数字输入
  | 'switch'          // 开关
  | 'select'          // 下拉选择
  | 'radio'           // 单选
  | 'slider'          // 滑块
  | 'textarea'        // 文本域
  | 'color'           // 颜色选择器
  | 'options-editor'  // 选项编辑器（用于 select、radio、checkbox 的选项配置）

/**
 * 属性配置项定义
 */
export interface PropConfig {
  name: string                    // 属性名称（对应组件的 prop）
  label: string                   // 显示标签
  type: PropConfigType            // 配置类型（已废弃，现在通过 name 自动匹配组件）
  defaultValue?: any              // 默认值
  options?: Array<{               // 下拉选择/单选的选项
    label: string
    value: any
  }>
  min?: number                    // 数字/滑块的最小值
  max?: number                    // 数字/滑块的最大值
  step?: number                   // 数字/滑块的步进值
  placeholder?: string            // 输入框占位符
  rows?: number                   // 文本域行数
  tip?: string                    // 提示信息
  group?: string                  // 属性分组（基础属性、高级属性等）
}

/**
 * 属性配置分组
 */
export interface PropConfigGroup {
  title: string                   // 分组标题
  configs: PropConfig[]           // 该分组下的配置项
  collapsed?: boolean             // 是否默认折叠
}
