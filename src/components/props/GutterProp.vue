<template>
  <el-input-number
    :model-value="modelValue"
    :min="0"
    :max="100"
    :step="4"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>
