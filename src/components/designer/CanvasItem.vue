<template>
  <div
    class="canvas-item"
    :class="{ 'is-selected': isSelected, 'is-hovered': isHovered }"
    @click.stop="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 拖动手柄 -->
    <div
      v-if="isSelected"
      class="drag-handle"
      @click.stop
    >
      <el-icon><Rank /></el-icon>
    </div>

    <!-- 统一渲染所有组件 -->
    <component
      :is="fieldComponent"
      v-bind="component.props"
      :children="component.children"
      :parent-id="component.id"
    />

    <div v-if="isSelected" class="item-actions">
      <el-button
        type="danger"
        size="small"
        :icon="Delete"
        circle
        @click.stop="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Delete, Rank } from '@element-plus/icons-vue'
import type { ComponentNode } from '@/types'
import { useDesignerStore } from '@/stores/designer'
import { fieldComponents } from '@/components/fields'

interface Props {
  component: ComponentNode
  index: number
  parentId?: string
}

const props = defineProps<Props>()

const designer = useDesignerStore()

const fieldComponent = computed(() => {
  return fieldComponents[props.component.type]
})

const isSelected = computed(() => {
  return designer.selectedId === props.component.id
})

const isHovered = computed(() => {
  return designer.hoveredId === props.component.id
})

function handleClick() {
  designer.selectComponent(props.component.id)
}

function handleMouseEnter() {
  designer.setHoveredId(props.component.id)
}

function handleMouseLeave() {
  designer.setHoveredId(null)
}

function handleDelete() {
  designer.removeComponent(props.component.id)
}
</script>

<style scoped>
.canvas-item {
  position: relative;
  padding: 16px;
  margin-bottom: 12px;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
}

.canvas-item.is-container {
  padding: 8px;
  background: #fafafa;
}

.canvas-item:hover {
  border-color: #c0c4cc;
}

.canvas-item.is-hovered {
  border-color: #909399;
}

.canvas-item.is-selected {
  border-color: #409eff;
  background: #ecf5ff;
}

.canvas-item.is-container.is-selected {
  background: #f0f9ff;
}

.drag-handle {
  position: absolute;
  left: -12px;
  top: -12px;
  cursor: move;
  color: #909399;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.drag-handle:hover {
  color: #409eff;
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.item-actions {
  position: absolute;
  top: -12px;
  right: -12px;
  display: flex;
  gap: 4px;
  z-index: 10;
}

.container-drop-zone {
  width: 100%;
  min-height: 50px;
}

.container-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  color: #909399;
  font-size: 14px;
  padding: 16px;
  border: 2px dashed #dcdfe6;
  border-radius: 4px;
  background: #fafafa;
  transition: all 0.3s;
}

.container-empty:hover {
  border-color: #409eff;
  color: #409eff;
  background: #ecf5ff;
}

.drop-indicator {
  height: 3px;
  background: #409eff;
  margin: 4px 0;
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
