<template>
  <BaseField :label="props.label" :required="props.required">
    <el-upload
      :action="props.action"
      :disabled="props.disabled"
      :multiple="props.multiple"
      :limit="props.limit"
      :accept="props.accept"
      :auto-upload="false"
    >
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          {{ props.tip }}
        </div>
      </template>
    </el-upload>
  </BaseField>
</template>

<script setup lang="ts">
import BaseField from './BaseField.vue'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
  action?: string
  multiple?: boolean
  limit?: number
  accept?: string
  tip?: string
}

withDefaults(defineProps<Props>(), {
  label: '文件上传',
  required: false,
  disabled: false,
  action: '#',
  multiple: false,
  limit: 1,
  accept: '',
  tip: '请选择文件上传'
})
</script>

<style scoped>
</style>
