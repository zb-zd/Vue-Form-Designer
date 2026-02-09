<template>
  <el-input
    :model-value="modelValue"
    @input="$emit('update:modelValue', $event)"
    placeholder="请输入标题"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
