<template>
  <div class="canvas">
    <div class="canvas-header">
      <h3>画布</h3>
      <div class="canvas-actions">
        <el-button
          v-if="designer.components.length > 0"
          size="small"
          @click="handleClearAll"
        >
          清空画布
        </el-button>
      </div>
    </div>
    <div
      class="canvas-content"
      @click="handleCanvasClick"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <div v-if="designer.components.length === 0" class="canvas-empty">
        <el-empty description="从左侧拖拽组件到此处，或点击组件库添加" />
      </div>
      <div v-else class="canvas-components">
        <CanvasItem
          v-for="component in designer.components"
          :key="component.id"
          :component="component"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { useDesignerStore } from '@/stores/designer'
import CanvasItem from './CanvasItem.vue'

const designer = useDesignerStore()

function handleCanvasClick() {
  designer.clearSelection()
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  const componentType = e.dataTransfer?.getData('componentType')
  if (componentType) {
    designer.addComponent(componentType)
  }
}

async function handleClearAll() {
  try {
    await ElMessageBox.confirm(
      '确定要清空画布吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    designer.components = []
    designer.clearSelection()
  } catch {
    // User cancelled
  }
}
</script>

<style scoped>
.canvas {
  flex: 1;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.canvas-header {
  padding: 16px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.canvas-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
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
</style>
