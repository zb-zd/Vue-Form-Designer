<template>
  <el-input-number
    :model-value="modelValue"
    :min="1"
    :max="24"
    :step="1"
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
