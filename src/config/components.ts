import type { ComponentConfig } from '@/types/componentConfig'

/**
 * 输入框组件配置
 */
export const inputConfig: ComponentConfig = {
  type: 'input',
  name: '输入框',
  icon: 'Edit',
  category: 'input',
  defaultProps: {
    label: '输入框',
    placeholder: '请输入',
    required: false,
    disabled: false,
    clearable: true,
    maxlength: undefined,
    showWordLimit: false
  }
}

/**
 * 数字输入框组件配置
 */
export const inputNumberConfig: ComponentConfig = {
  type: 'inputNumber',
  name: '数字输入框',
  icon: 'Histogram',
  category: 'input',
  defaultProps: {
    label: '数字输入框',
    placeholder: '请输入数字',
    required: false,
    disabled: false,
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined
  }
}

/**
 * 文本域组件配置
 */
export const textareaConfig: ComponentConfig = {
  type: 'textarea',
  name: '文本域',
  icon: 'Document',
  category: 'input',
  defaultProps: {
    label: '文本域',
    placeholder: '请输入',
    required: false,
    disabled: false,
    rows: 3,
    maxlength: undefined,
    showWordLimit: false
  }
}

/**
 * 下拉选择组件配置
 */
export const selectConfig: ComponentConfig = {
  type: 'select',
  name: '下拉选择',
  icon: 'ArrowDown',
  category: 'input',
  defaultProps: {
    label: '下拉选择',
    placeholder: '请选择',
    required: false,
    disabled: false,
    clearable: true,
    multiple: false,
    filterable: false,
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  }
}

/**
 * 单选框组组件配置
 */
export const radioGroupConfig: ComponentConfig = {
  type: 'radioGroup',
  name: '单选框组',
  icon: 'CircleCheck',
  category: 'input',
  defaultProps: {
    label: '单选框组',
    required: false,
    disabled: false,
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  }
}

/**
 * 复选框组组件配置
 */
export const checkboxGroupConfig: ComponentConfig = {
  type: 'checkboxGroup',
  name: '复选框组',
  icon: 'Select',
  category: 'input',
  defaultProps: {
    label: '复选框组',
    required: false,
    disabled: false,
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  }
}

/**
 * 日期选择器组件配置
 */
export const datePickerConfig: ComponentConfig = {
  type: 'datePicker',
  name: '日期选择器',
  icon: 'Calendar',
  category: 'input',
  defaultProps: {
    label: '日期选择器',
    placeholder: '请选择日期',
    required: false,
    disabled: false,
    clearable: true,
    type: 'date',
    format: 'YYYY-MM-DD'
  }
}

/**
 * 时间选择器组件配置
 */
export const timePickerConfig: ComponentConfig = {
  type: 'timePicker',
  name: '时间选择器',
  icon: 'Clock',
  category: 'input',
  defaultProps: {
    label: '时间选择器',
    placeholder: '请选择时间',
    required: false,
    disabled: false,
    clearable: true,
    format: 'HH:mm:ss'
  }
}

/**
 * 开关组件配置
 */
export const switchConfig: ComponentConfig = {
  type: 'switch',
  name: '开关',
  icon: 'Open',
  category: 'input',
  defaultProps: {
    label: '开关',
    required: false,
    disabled: false
  }
}

/**
 * 滑块组件配置
 */
export const sliderConfig: ComponentConfig = {
  type: 'slider',
  name: '滑块',
  icon: 'Minus',
  category: 'input',
  defaultProps: {
    label: '滑块',
    required: false,
    disabled: false,
    min: 0,
    max: 100,
    step: 1
  }
}

/**
 * 文件上传组件配置
 */
export const uploadConfig: ComponentConfig = {
  type: 'upload',
  name: '文件上传',
  icon: 'Upload',
  category: 'input',
  defaultProps: {
    label: '文件上传',
    required: false,
    disabled: false,
    action: '#',
    multiple: false,
    limit: 1,
    accept: '',
    tip: '请选择文件上传'
  }
}

/**
 * 所有组件配置
 */
export const componentConfigs: ComponentConfig[] = [
  inputConfig,
  inputNumberConfig,
  textareaConfig,
  selectConfig,
  radioGroupConfig,
  checkboxGroupConfig,
  datePickerConfig,
  timePickerConfig,
  switchConfig,
  sliderConfig,
  uploadConfig
]

/**
 * 根据类型获取组件配置
 */
export function getComponentConfig(type: string): ComponentConfig | undefined {
  return componentConfigs.find(config => config.type === type)
}
