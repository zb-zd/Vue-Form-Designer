<template>
  <BaseField :label="props.label" :required="props.required">
    <el-time-picker
      v-model="timeValue"
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
  format?: string
  modelValue?: Date | string
}

const props = withDefaults(defineProps<Props>(), {
  label: '时间选择器',
  placeholder: '请选择时间',
  required: false,
  disabled: false,
  clearable: true,
  format: 'HH:mm:ss',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | string]
}>()

const timeValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  timeValue.value = newVal
})

watch(timeValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
