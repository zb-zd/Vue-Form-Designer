<template>
  <BaseField :label="props.label" :required="props.required">
    <el-input-number
      v-model="inputValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :precision="props.precision"
      :controls-position="props.controlsPosition"
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
  min?: number
  max?: number
  step?: number
  precision?: number
  controlsPosition?: 'right' | ''
  modelValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '数字输入框',
  placeholder: '请输入数字',
  required: false,
  disabled: false,
  step: 1,
  controlsPosition: 'right',
  modelValue: 0
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
