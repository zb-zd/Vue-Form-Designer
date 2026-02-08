<template>
  <el-input
    :model-value="modelValue"
    placeholder="请输入占位提示"
    @input="handleChange"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleChange(value: string) {
  emit('update:modelValue', value)
}
</script>
