<template>
  <BaseField :label="props.label" :required="props.required">
    <el-switch
      v-model="switchValue"
      :disabled="props.disabled"
      :active-text="props.activeText"
      :inactive-text="props.inactiveText"
    />
  </BaseField>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseField from './BaseField.vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '开关',
  required: false,
  disabled: false,
  activeText: '',
  inactiveText: '',
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const switchValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  switchValue.value = newVal
})

watch(switchValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
</style>
