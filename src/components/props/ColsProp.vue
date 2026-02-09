<template>
  <el-form-item label="列数">
    <el-input-number
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :min="1"
      :max="12"
      :step="1"
    />
  </el-form-item>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: number
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>
