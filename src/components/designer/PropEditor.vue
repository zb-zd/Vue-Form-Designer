<template>
  <div class="prop-editor">
    <!-- 文本输入 -->
    <el-input
      v-if="config.type === 'input'"
      :model-value="modelValue"
      :placeholder="config.placeholder"
      @input="handleChange"
    />

    <!-- 数字输入 -->
    <el-input-number
      v-else-if="config.type === 'number'"
      :model-value="modelValue"
      :min="config.min"
      :max="config.max"
      :step="config.step"
      :placeholder="config.placeholder"
      @change="handleChange"
    />

    <!-- 开关 -->
    <el-switch
      v-else-if="config.type === 'switch'"
      :model-value="modelValue"
      @change="handleChange"
    />

    <!-- 下拉选择 -->
    <el-select
      v-else-if="config.type === 'select'"
      :model-value="modelValue"
      @change="handleChange"
    >
      <el-option
        v-for="option in config.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>

    <!-- 文本域 -->
    <el-input
      v-else-if="config.type === 'textarea'"
      type="textarea"
      :model-value="modelValue"
      :placeholder="config.placeholder"
      :rows="3"
      @input="handleChange"
    />

    <!-- 滑块 -->
    <el-slider
      v-else-if="config.type === 'slider'"
      :model-value="modelValue"
      :min="config.min"
      :max="config.max"
      :step="config.step"
      @change="handleChange"
    />

    <!-- 选项编辑器 -->
    <div v-else-if="config.type === 'options-editor'" class="options-editor">
      <div
        v-for="(option, index) in (modelValue as any[])"
        :key="index"
        class="option-item"
      >
        <el-input
          v-model="option.label"
          placeholder="标签"
          size="small"
          @input="handleOptionsChange"
        />
        <el-input
          v-model="option.value"
          placeholder="值"
          size="small"
          @input="handleOptionsChange"
        />
        <el-button
          type="danger"
          size="small"
          :icon="Delete"
          circle
          @click="removeOption(index)"
        />
      </div>
      <el-button
        type="primary"
        size="small"
        :icon="Plus"
        @click="addOption"
      >
        添加选项
      </el-button>
    </div>

    <!-- 提示信息 -->
    <div v-if="config.tip" class="prop-tip">
      {{ config.tip }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus } from '@element-plus/icons-vue'
import type { PropConfig } from '@/types'

interface Props {
  config: PropConfig
  modelValue: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

function handleChange(value: any) {
  emit('update:modelValue', value)
}

function handleOptionsChange() {
  emit('update:modelValue', props.modelValue)
}

function addOption() {
  const options = [...(props.modelValue as any[])]
  options.push({
    label: `选项${options.length + 1}`,
    value: `${options.length + 1}`
  })
  emit('update:modelValue', options)
}

function removeOption(index: number) {
  const options = [...(props.modelValue as any[])]
  options.splice(index, 1)
  emit('update:modelValue', options)
}
</script>

<style scoped>
.prop-editor {
  width: 100%;
}

.options-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.option-item .el-input {
  flex: 1;
}

.prop-tip {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}
</style>
