<template>
  <el-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option label="总是显示" value="always" />
    <el-option label="悬停显示" value="hover" />
    <el-option label="从不显示" value="never" />
  </el-select>
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
