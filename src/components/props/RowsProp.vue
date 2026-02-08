<template>
  <el-input-number
    :model-value="modelValue"
    :min="1"
    :max="20"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: number
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number | undefined]
}>()

function handleChange(value: number | undefined) {
  emit('update:modelValue', value)
}
</script>
