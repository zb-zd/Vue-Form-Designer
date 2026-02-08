import type { ComponentMeta } from '@/types'
import InputField from './InputField.vue'
import InputNumberField from './InputNumberField.vue'
import TextareaField from './TextareaField.vue'
import SelectField from './SelectField.vue'
import RadioGroupField from './RadioGroupField.vue'
import CheckboxGroupField from './CheckboxGroupField.vue'
import DatePickerField from './DatePickerField.vue'
import TimePickerField from './TimePickerField.vue'
import SwitchField from './SwitchField.vue'
import SliderField from './SliderField.vue'
import UploadField from './UploadField.vue'
import {
  inputPropConfigs,
  inputNumberPropConfigs,
  textareaPropConfigs,
  selectPropConfigs,
  radioGroupPropConfigs,
  checkboxGroupPropConfigs,
  datePickerPropConfigs,
  timePickerPropConfigs,
  switchPropConfigs,
  sliderPropConfigs,
  uploadPropConfigs
} from '@/config/propConfigs'

/**
 * Field component registry
 */
export const fieldComponents: Record<string, any> = {
  input: InputField,
  inputNumber: InputNumberField,
  textarea: TextareaField,
  select: SelectField,
  radioGroup: RadioGroupField,
  checkboxGroup: CheckboxGroupField,
  datePicker: DatePickerField,
  timePicker: TimePickerField,
  switch: SwitchField,
  slider: SliderField,
  upload: UploadField
}

export const fieldMetas: ComponentMeta[] = [
  {
    type: 'input',
    name: '输入框',
    icon: 'Edit',
    category: 'input',
    propConfigs: inputPropConfigs,
    defaultProps: {
      label: '输入框',
      placeholder: '请输入',
      required: false,
      disabled: false,
      clearable: true,
      maxlength: undefined,
      showWordLimit: false
    }
  },
  {
    type: 'inputNumber',
    name: '数字输入框',
    icon: 'Histogram',
    category: 'input',
    propConfigs: inputNumberPropConfigs,
    defaultProps: {
      label: '数字输入框',
      placeholder: '请输入数字',
      required: false,
      disabled: false,
      min: undefined,
      max: undefined,
      step: 1,
      precision: undefined,
      controlsPosition: 'right'
    }
  },
  {
    type: 'textarea',
    name: '文本域',
    icon: 'Document',
    category: 'input',
    propConfigs: textareaPropConfigs,
    defaultProps: {
      label: '文本域',
      placeholder: '请输入',
      required: false,
      disabled: false,
      rows: 3,
      maxlength: undefined,
      showWordLimit: false,
      autosize: false
    }
  },
  {
    type: 'select',
    name: '下拉选择',
    icon: 'ArrowDown',
    category: 'input',
    propConfigs: selectPropConfigs,
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
  },
  {
    type: 'radioGroup',
    name: '单选框组',
    icon: 'CircleCheck',
    category: 'input',
    propConfigs: radioGroupPropConfigs,
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
  },
  {
    type: 'checkboxGroup',
    name: '复选框组',
    icon: 'Select',
    category: 'input',
    propConfigs: checkboxGroupPropConfigs,
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
  },
  {
    type: 'datePicker',
    name: '日期选择器',
    icon: 'Calendar',
    category: 'input',
    propConfigs: datePickerPropConfigs,
    defaultProps: {
      label: '日期选择器',
      placeholder: '请选择日期',
      required: false,
      disabled: false,
      clearable: true,
      type: 'date',
      format: 'YYYY-MM-DD'
    }
  },
  {
    type: 'timePicker',
    name: '时间选择器',
    icon: 'Clock',
    category: 'input',
    propConfigs: timePickerPropConfigs,
    defaultProps: {
      label: '时间选择器',
      placeholder: '请选择时间',
      required: false,
      disabled: false,
      clearable: true,
      format: 'HH:mm:ss'
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'Open',
    category: 'input',
    propConfigs: switchPropConfigs,
    defaultProps: {
      label: '开关',
      required: false,
      disabled: false,
      activeText: '',
      inactiveText: ''
    }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'Minus',
    category: 'input',
    propConfigs: sliderPropConfigs,
    defaultProps: {
      label: '滑块',
      required: false,
      disabled: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false
    }
  },
  {
    type: 'upload',
    name: '文件上传',
    icon: 'Upload',
    category: 'input',
    propConfigs: uploadPropConfigs,
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
]
