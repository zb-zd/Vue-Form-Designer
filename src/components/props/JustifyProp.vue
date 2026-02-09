<template>
  <el-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option label="左对齐" value="start" />
    <el-option label="右对齐" value="end" />
    <el-option label="居中" value="center" />
    <el-option label="两端对齐" value="space-between" />
    <el-option label="环绕对齐" value="space-around" />
    <el-option label="均匀对齐" value="space-evenly" />
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
