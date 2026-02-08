<template>
  <div class="prop-editor">
    <!-- 动态加载属性组件 -->
    <component
      :is="propComponent"
      v-if="propComponent"
      :model-value="modelValue"
      @update:model-value="handleChange"
    />

    <!-- 降级：如果没有找到对应的属性组件，显示默认输入框 -->
    <el-input
      v-else
      :model-value="modelValue"
      @input="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPropComponent } from '@/components/props'

interface Props {
  config: {
    name: string
  }
  modelValue: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

// 根据配置的属性名动态获取对应的组件
const propComponent = computed(() => {
  return getPropComponent(props.config.name)
})

function handleChange(value: any) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.prop-editor {
  width: 100%;
}
</style>
