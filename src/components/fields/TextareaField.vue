<template>
  <BaseField :label="props.label" :required="props.required">
    <el-input
      v-model="inputValue"
      type="textarea"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :rows="props.rows"
      :maxlength="props.maxlength"
      :show-word-limit="props.showWordLimit"
      :autosize="props.autosize"
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
  rows?: number
  maxlength?: number
  showWordLimit?: boolean
  autosize?: boolean | { minRows?: number; maxRows?: number }
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '文本域',
  placeholder: '请输入',
  required: false,
  disabled: false,
  rows: 3,
  showWordLimit: false,
  autosize: false,
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
