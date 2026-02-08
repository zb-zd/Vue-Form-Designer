<template>
  <div class="options-editor">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="option-item"
    >
      <el-input
        v-model="option.label"
        placeholder="标签"
        size="small"
        @input="handleChange"
      />
      <el-input
        v-model="option.value"
        placeholder="值"
        size="small"
        @input="handleChange"
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue?: Option[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: Option[]]
}>()

const options = ref<Option[]>([...props.modelValue])

watch(() => props.modelValue, (newVal) => {
  options.value = [...newVal]
}, { deep: true })

function handleChange() {
  emit('update:modelValue', options.value)
}

function addOption() {
  options.value.push({
    label: `选项${options.value.length + 1}`,
    value: `${options.value.length + 1}`
  })
  handleChange()
}

function removeOption(index: number) {
  options.value.splice(index, 1)
  handleChange()
}
</script>

<style scoped>
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
</style>
