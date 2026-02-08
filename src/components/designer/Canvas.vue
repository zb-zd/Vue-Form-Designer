<template>
  <div class="canvas">
    <div
      class="canvas-content"
      @click="handleCanvasClick"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <div v-if="designer.components.length === 0" class="canvas-empty">
        <el-empty description="从左侧拖拽组件到此处，或点击组件库添加" />
      </div>
      <div v-else class="canvas-components">
        <template v-for="(component, index) in designer.components" :key="component.id">
          <div v-if="dropPosition === index" class="drop-indicator" />
          <div class="component-wrapper">
            <CanvasItem :component="component" :index="index" @drag-start="handleComponentDragStart" />
          </div>
        </template>
        <div v-if="dropPosition === designer.components.length" class="drop-indicator" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDesignerStore } from '@/stores/designer'
import CanvasItem from './CanvasItem.vue'

const designer = useDesignerStore()
const dropPosition = ref<number | null>(null)
const draggedComponentIndex = ref<number | null>(null)

function handleCanvasClick() {
  designer.clearSelection()
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  if (e.dataTransfer) {
    // 如果是拖动现有组件，使用 move；否则使用 copy
    e.dataTransfer.dropEffect = draggedComponentIndex.value !== null ? 'move' : 'copy'
  }

  // 计算插入位置
  if (designer.components.length > 0) {
    const canvasContent = e.currentTarget as HTMLElement
    const componentWrappers = canvasContent.querySelectorAll('.component-wrapper')

    let insertIndex = designer.components.length

    for (let i = 0; i < componentWrappers.length; i++) {
      const wrapper = componentWrappers[i] as HTMLElement
      const rect = wrapper.getBoundingClientRect()
      const middle = rect.top + rect.height / 2

      if (e.clientY < middle) {
        insertIndex = i
        break
      }
    }

    dropPosition.value = insertIndex
  } else {
    dropPosition.value = 0
  }
}

function handleDragLeave(e: DragEvent) {
  // 只有当真正离开画布区域时才重置（不是移动到子元素）
  const relatedTarget = e.relatedTarget as HTMLElement
  const currentTarget = e.currentTarget as HTMLElement

  if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
    dropPosition.value = null
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  const componentType = e.dataTransfer?.getData('componentType')
  const draggedIndex = e.dataTransfer?.getData('componentIndex')

  if (draggedIndex !== undefined && draggedIndex !== '') {
    // 拖动现有组件进行重排序
    const fromIndex = parseInt(draggedIndex, 10)
    if (dropPosition.value !== null && fromIndex !== dropPosition.value) {
      designer.moveComponent(fromIndex, dropPosition.value)
    }
  } else if (componentType) {
    // 从组件库拖入新组件
    const index = dropPosition.value !== null ? dropPosition.value : undefined
    designer.addComponent(componentType, index)
  }

  dropPosition.value = null
  draggedComponentIndex.value = null
}

function handleComponentDragStart(index: number, event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('componentIndex', index.toString())
  }
  draggedComponentIndex.value = index
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
}

.component-wrapper {
  margin-bottom: 12px;
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
