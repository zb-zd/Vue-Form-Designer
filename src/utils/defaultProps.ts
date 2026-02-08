/**
 * Default properties for each component type
 */
export const defaultProps: Record<string, Record<string, any>> = {
  input: {
    label: '输入框',
    placeholder: '请输入',
    required: false,
    disabled: false,
    clearable: true,
    maxlength: undefined,
    showWordLimit: false
  },
  inputNumber: {
    label: '数字输入框',
    placeholder: '请输入数字',
    required: false,
    disabled: false,
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined,
    controlsPosition: 'right'
  },
  textarea: {
    label: '文本域',
    placeholder: '请输入',
    required: false,
    disabled: false,
    rows: 3,
    maxlength: undefined,
    showWordLimit: false,
    autosize: false
  },
  select: {
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
  },
  radioGroup: {
    label: '单选框组',
    required: false,
    disabled: false,
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  },
  checkboxGroup: {
    label: '复选框组',
    required: false,
    disabled: false,
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]
  },
  datePicker: {
    label: '日期选择器',
    placeholder: '请选择日期',
    required: false,
    disabled: false,
    clearable: true,
    type: 'date',
    format: 'YYYY-MM-DD'
  },
  timePicker: {
    label: '时间选择器',
    placeholder: '请选择时间',
    required: false,
    disabled: false,
    clearable: true,
    format: 'HH:mm:ss'
  },
  switch: {
    label: '开关',
    required: false,
    disabled: false,
    activeText: '',
    inactiveText: ''
  },
  slider: {
    label: '滑块',
    required: false,
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    showInput: false
  },
  upload: {
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
 * Get default props for a component type
 */
export function getDefaultProps(type: string): Record<string, any> {
  return defaultProps[type] ? { ...defaultProps[type] } : {}
}
