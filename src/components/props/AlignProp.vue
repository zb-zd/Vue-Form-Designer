<template>
  <el-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option label="顶部对齐" value="top" />
    <el-option label="居中对齐" value="middle" />
    <el-option label="底部对齐" value="bottom" />
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
