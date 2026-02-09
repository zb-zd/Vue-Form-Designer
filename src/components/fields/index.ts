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
import RowField from './RowField.vue'
import ColField from './ColField.vue'
import PanelField from './PanelField.vue'
import GridField from './GridField.vue'
import {
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
} from '@/config/components'
import {
  rowConfig,
  colConfig,
  panelConfig,
  gridConfig
} from '@/config/layoutComponents'

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
  upload: UploadField,
  row: RowField,
  col: ColField,
  panel: PanelField,
  grid: GridField
}

export const fieldMetas: ComponentMeta[] = [
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
  uploadConfig,
  gridConfig,
  // 暂时禁用其他容器组件，先专注于Grid
  // rowConfig,
  // colConfig,
  // panelConfig
]
