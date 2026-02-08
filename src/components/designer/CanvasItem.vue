<template>
  <div
    class="canvas-item"
    :class="{ 'is-selected': isSelected, 'is-hovered': isHovered }"
    @click.stop="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <component
      :is="fieldComponent"
      v-bind="component.props"
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
import { Delete } from '@element-plus/icons-vue'
import type { ComponentNode } from '@/types'
import { useDesignerStore } from '@/stores/designer'
import { fieldComponents } from '@/components/fields'

interface Props {
  component: ComponentNode
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
  margin-bottom: 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
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

.item-actions {
  position: absolute;
  top: -12px;
  right: -12px;
  display: flex;
  gap: 4px;
}
</style>
