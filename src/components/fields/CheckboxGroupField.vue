<template>
  <BaseField :label="props.label" :required="props.required">
    <el-checkbox-group
      v-model="checkboxValue"
      :disabled="props.disabled"
    >
      <el-checkbox
        v-for="option in props.options"
        :key="option.value"
        :label="option.value"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </BaseField>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseField from './BaseField.vue'

interface CheckboxOption {
  label: string
  value: string | number
}

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  options?: CheckboxOption[]
  modelValue?: (string | number)[]
}

const props = withDefaults(defineProps<Props>(), {
  label: '复选框组',
  required: false,
  disabled: false,
  options: () => [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ],
  modelValue: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
}>()

const checkboxValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  checkboxValue.value = newVal
})

watch(checkboxValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
