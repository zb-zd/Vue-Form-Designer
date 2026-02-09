<template>
  <div class="canvas">
    <div class="canvas-content" @click="handleCanvasClick">
      <VueDraggable
        v-model="designer.components"
        :group="{ name: 'components' }"
        @add="handleAdd"
        class="canvas-components"
      >
        <div v-if="designer.components.length === 0" class="canvas-empty">
          <el-empty description="从左侧拖拽组件到此处，或点击组件库添加" />
        </div>
        <template v-for="(element, index) in designer.components" :key="element.id || `temp-${index}`">
          <CanvasItem :component="element" :index="index" />
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { useDesignerStore } from '@/stores/designer'
import { useComponentRegistryStore } from '@/stores/componentRegistry'
import { getDefaultProps } from '@/utils/defaultProps'
import CanvasItem from './CanvasItem.vue'

const designer = useDesignerStore()

function handleCanvasClick() {
  designer.clearSelection()
}

function handleAdd(evt: any) {
  const { newIndex } = evt

  console.log('Canvas handleAdd:', evt, 'newIndex:', newIndex)

  // vue-draggable-plus 已经把克隆的对象添加到数组中了
  // 直接从数组中获取占位符对象
  const placeholder = designer.components[newIndex]
  console.log('Canvas placeholder:', placeholder)

  // 检查是否是从组件库克隆的（只有 type，没有 id）
  if (placeholder && placeholder.type && !placeholder.id) {
    console.log('Canvas: 从组件库添加新组件', placeholder.type)
    // 从组件库添加新组件
    const componentRegistry = useComponentRegistryStore()
    const componentMeta = componentRegistry.getComponent(placeholder.type)
    const id = `${placeholder.type}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const newComponent: any = {
      id,
      type: placeholder.type,
      props: getDefaultProps(placeholder.type)
    }

    // 如果是容器组件，初始化 children 数组
    if (componentMeta?.isContainer) {
      console.log('Canvas: 初始化容器组件 children 数组')
      newComponent.children = []
    }

    console.log('Canvas: 创建的新组件:', newComponent)

    // 替换占位符为真实组件
    designer.components.splice(newIndex, 1, newComponent)
    console.log('Canvas: 替换后的 components:', designer.components)
    designer.selectComponent(id)
  }
  // 如果是从其他容器移动（有 id），vue-draggable-plus 已经处理
}
</script>

<style scoped>
.canvas {
  flex: 1;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.canvas-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.canvas-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

.canvas-components {
  max-width: 800px;
  margin: 0 auto;
  min-height: 400px;
}

.drop-indicator {
  height: 3px;
  background: #409eff;
  margin: 8px 0;
  border-radius: 2px;
  animation: pulse 0.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
