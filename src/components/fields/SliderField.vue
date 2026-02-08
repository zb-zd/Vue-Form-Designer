<template>
  <BaseField :label="props.label" :required="props.required">
    <el-slider
      v-model="sliderValue"
      :disabled="props.disabled"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :show-input="props.showInput"
    />
  </BaseField>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseField from './BaseField.vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  showInput?: boolean
  modelValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  label: '滑块',
  required: false,
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  showInput: false,
  modelValue: 0
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const sliderValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  sliderValue.value = newVal
})

watch(sliderValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
