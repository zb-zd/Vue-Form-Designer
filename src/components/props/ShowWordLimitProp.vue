<template>
  <el-switch
    :model-value="modelValue"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleChange(value: boolean) {
  emit('update:modelValue', value)
}
</script>
