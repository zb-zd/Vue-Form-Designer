<template>
  <BaseField :label="props.label" :required="props.required">
    <el-input
      v-model="inputValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :clearable="props.clearable"
      :maxlength="props.maxlength"
      :show-word-limit="props.showWordLimit"
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
  maxlength?: number
  showWordLimit?: boolean
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '输入框',
  placeholder: '请输入',
  required: false,
  disabled: false,
  clearable: true,
  showWordLimit: false,
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
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
