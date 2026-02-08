<template>
  <BaseField :label="props.label" :required="props.required">
    <el-select
      v-model="selectValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :clearable="props.clearable"
      :multiple="props.multiple"
      :filterable="props.filterable"
    >
      <el-option
        v-for="option in props.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </BaseField>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseField from './BaseField.vue'

interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  filterable?: boolean
  options?: SelectOption[]
  modelValue?: string | number | string[] | number[]
}

const props = withDefaults(defineProps<Props>(), {
  label: '下拉选择',
  placeholder: '请选择',
  required: false,
  disabled: false,
  clearable: true,
  multiple: false,
  filterable: false,
  options: () => [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ],
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | string[] | number[]]
}>()

const selectValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  selectValue.value = newVal
})

watch(selectValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
