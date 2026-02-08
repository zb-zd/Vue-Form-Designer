import type { PropConfig } from '@/types'

/**
 * 公共属性配置（所有组件都有的基础属性）
 */
export const commonPropConfigs: PropConfig[] = [
  {
    name: 'label',
    label: '字段标签',
    type: 'input',
    defaultValue: '',
    placeholder: '请输入字段标签',
    group: 'basic'
  },
  {
    name: 'required',
    label: '是否必填',
    type: 'switch',
    defaultValue: false,
    group: 'basic'
  },
  {
    name: 'disabled',
    label: '是否禁用',
    type: 'switch',
    defaultValue: false,
    group: 'basic'
  }
]

/**
 * 输入框组件属性配置
 */
export const inputPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'placeholder',
    label: '占位提示',
    type: 'input',
    defaultValue: '请输入',
    placeholder: '请输入占位提示文字',
    group: 'basic'
  },
  {
    name: 'clearable',
    label: '可清空',
    type: 'switch',
    defaultValue: true,
    group: 'basic'
  },
  {
    name: 'maxlength',
    label: '最大长度',
    type: 'number',
    defaultValue: undefined,
    min: 0,
    placeholder: '不限制',
    group: 'advanced'
  },
  {
    name: 'showWordLimit',
    label: '显示字数统计',
    type: 'switch',
    defaultValue: false,
    group: 'advanced'
  }
]

/**
 * 数字输入框组件属性配置
 */
export const inputNumberPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'placeholder',
    label: '占位提示',
    type: 'input',
    defaultValue: '请输入数字',
    group: 'basic'
  },
  {
    name: 'min',
    label: '最小值',
    type: 'number',
    defaultValue: undefined,
    placeholder: '不限制',
    group: 'basic'
  },
  {
    name: 'max',
    label: '最大值',
    type: 'number',
    defaultValue: undefined,
    placeholder: '不限制',
    group: 'basic'
  },
  {
    name: 'step',
    label: '步进值',
    type: 'number',
    defaultValue: 1,
    min: 0,
    group: 'basic'
  },
  {
    name: 'precision',
    label: '精度',
    type: 'number',
    defaultValue: undefined,
    min: 0,
    placeholder: '不限制',
    tip: '数值精度（小数位数）',
    group: 'advanced'
  },
  {
    name: 'controlsPosition',
    label: '按钮位置',
    type: 'select',
    defaultValue: 'right',
    options: [
      { label: '右侧', value: 'right' },
      { label: '两侧', value: '' }
    ],
    group: 'advanced'
  }
]

/**
 * 文本域组件属性配置
 */
export const textareaPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'placeholder',
    label: '占位提示',
    type: 'input',
    defaultValue: '请输入',
    group: 'basic'
  },
  {
    name: 'rows',
    label: '行数',
    type: 'number',
    defaultValue: 3,
    min: 1,
    max: 20,
    group: 'basic'
  },
  {
    name: 'maxlength',
    label: '最大长度',
    type: 'number',
    defaultValue: undefined,
    min: 0,
    placeholder: '不限制',
    group: 'advanced'
  },
  {
    name: 'showWordLimit',
    label: '显示字数统计',
    type: 'switch',
    defaultValue: false,
    group: 'advanced'
  },
  {
    name: 'autosize',
    label: '自适应高度',
    type: 'switch',
    defaultValue: false,
    group: 'advanced'
  }
]

/**
 * 下拉选择组件属性配置
 */
export const selectPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'placeholder',
    label: '占位提示',
    type: 'input',
    defaultValue: '请选择',
    group: 'basic'
  },
  {
    name: 'clearable',
    label: '可清空',
    type: 'switch',
    defaultValue: true,
    group: 'basic'
  },
  {
    name: 'multiple',
    label: '多选',
    type: 'switch',
    defaultValue: false,
    group: 'basic'
  },
  {
    name: 'filterable',
    label: '可搜索',
    type: 'switch',
    defaultValue: false,
    group: 'advanced'
  },
  {
    name: 'options',
    label: '选项配置',
    type: 'options-editor',
    defaultValue: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ],
    group: 'basic'
  }
]

/**
 * 单选框组组件属性配置
 */
export const radioGroupPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'options',
    label: '选项配置',
    type: 'options-editor',
    defaultValue: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ],
    group: 'basic'
  }
]

/**
 * 复选框组组件属性配置
 */
export const checkboxGroupPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'options',
    label: '选项配置',
    type: 'options-editor',
    defaultValue: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ],
    group: 'basic'
  }
]

/**
 * 日期选择器组件属性配置
 */
export const datePickerPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'placeholder',
    label: '占位提示',
    type: 'input',
    defaultValue: '请选择日期',
    group: 'basic'
  },
  {
    name: 'clearable',
    label: '可清空',
    type: 'switch',
    defaultValue: true,
    group: 'basic'
  },
  {
    name: 'type',
    label: '选择器类型',
    type: 'select',
    defaultValue: 'date',
    options: [
      { label: '日期', value: 'date' },
      { label: '日期时间', value: 'datetime' },
      { label: '日期范围', value: 'daterange' },
      { label: '日期时间范围', value: 'datetimerange' }
    ],
    group: 'basic'
  },
  {
    name: 'format',
    label: '显示格式',
    type: 'input',
    defaultValue: 'YYYY-MM-DD',
    placeholder: 'YYYY-MM-DD',
    group: 'advanced'
  }
]

/**
 * 时间选择器组件属性配置
 */
export const timePickerPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'placeholder',
    label: '占位提示',
    type: 'input',
    defaultValue: '请选择时间',
    group: 'basic'
  },
  {
    name: 'clearable',
    label: '可清空',
    type: 'switch',
    defaultValue: true,
    group: 'basic'
  },
  {
    name: 'format',
    label: '显示格式',
    type: 'input',
    defaultValue: 'HH:mm:ss',
    placeholder: 'HH:mm:ss',
    group: 'advanced'
  }
]

/**
 * 开关组件属性配置
 */
export const switchPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'activeText',
    label: '打开时文字',
    type: 'input',
    defaultValue: '',
    placeholder: '可选',
    group: 'basic'
  },
  {
    name: 'inactiveText',
    label: '关闭时文字',
    type: 'input',
    defaultValue: '',
    placeholder: '可选',
    group: 'basic'
  }
]

/**
 * 滑块组件属性配置
 */
export const sliderPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'min',
    label: '最小值',
    type: 'number',
    defaultValue: 0,
    group: 'basic'
  },
  {
    name: 'max',
    label: '最大值',
    type: 'number',
    defaultValue: 100,
    group: 'basic'
  },
  {
    name: 'step',
    label: '步进值',
    type: 'number',
    defaultValue: 1,
    min: 0,
    group: 'basic'
  },
  {
    name: 'showInput',
    label: '显示输入框',
    type: 'switch',
    defaultValue: false,
    group: 'advanced'
  }
]

/**
 * 文件上传组件属性配置
 */
export const uploadPropConfigs: PropConfig[] = [
  ...commonPropConfigs,
  {
    name: 'action',
    label: '上传地址',
    type: 'input',
    defaultValue: '#',
    placeholder: '请输入上传接口地址',
    group: 'basic'
  },
  {
    name: 'multiple',
    label: '多文件上传',
    type: 'switch',
    defaultValue: false,
    group: 'basic'
  },
  {
    name: 'limit',
    label: '文件数量限制',
    type: 'number',
    defaultValue: 1,
    min: 1,
    group: 'basic'
  },
  {
    name: 'accept',
    label: '文件类型',
    type: 'input',
    defaultValue: '',
    placeholder: '如: .jpg,.png,.pdf',
    group: 'advanced'
  },
  {
    name: 'tip',
    label: '提示文字',
    type: 'input',
    defaultValue: '请选择文件上传',
    group: 'advanced'
  }
]

/**
 * 根据组件类型获取属性配置
 */
export function getPropConfigsByType(type: string): PropConfig[] {
  const configMap: Record<string, PropConfig[]> = {
    input: inputPropConfigs,
    inputNumber: inputNumberPropConfigs,
    textarea: textareaPropConfigs,
    select: selectPropConfigs,
    radioGroup: radioGroupPropConfigs,
    checkboxGroup: checkboxGroupPropConfigs,
    datePicker: datePickerPropConfigs,
    timePicker: timePickerPropConfigs,
    switch: switchPropConfigs,
    slider: sliderPropConfigs,
    upload: uploadPropConfigs
  }

  return configMap[type] || commonPropConfigs
}
