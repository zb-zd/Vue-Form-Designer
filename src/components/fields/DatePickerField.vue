<template>
  <BaseField :label="props.label" :required="props.required">
    <el-date-picker
      v-model="dateValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :clearable="props.clearable"
      :format="props.format"
    />
  </BaseField>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseField from './BaseField.vue'

interface Props {
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  clearable?: boolean
  type?: 'date' | 'datetime' | 'daterange' | 'datetimerange'
  format?: string
  modelValue?: Date | string | Date[] | string[]
}

const props = withDefaults(defineProps<Props>(), {
  label: '日期选择器',
  placeholder: '请选择日期',
  required: false,
  disabled: false,
  clearable: true,
  type: 'date',
  format: 'YYYY-MM-DD',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | string | Date[] | string[]]
}>()

const dateValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  dateValue.value = newVal
})

watch(dateValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
