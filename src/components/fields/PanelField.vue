<template>
  <div class="panel-field">
    <el-card :shadow="shadow">
      <template v-if="title" #header>
        <div class="panel-header">{{ title }}</div>
      </template>
      <div class="panel-content">
        <VueDraggable
          :model-value="children"
          :group="{ name: 'components' }"
          item-key="id"
          class="panel-drop-zone"
          @add="handleAdd"
        >
          <template #item="{ element }">
            <CanvasItem
              :component="element"
              :index="0"
              :parent-id="parentId"
            />
          </template>
        </VueDraggable>

        <div v-if="!children || children.length === 0" class="panel-empty">
          拖入组件到此处
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import type { ComponentNode } from '@/types'
import CanvasItem from '@/components/designer/CanvasItem.vue'
import { useDesignerStore } from '@/stores/designer'

interface Props {
  title?: string
  shadow?: 'always' | 'hover' | 'never'
  children?: ComponentNode[]
  parentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '分组容器',
  shadow: 'hover',
  children: () => []
})

const designer = useDesignerStore()

function handleAdd(evt: any) {
  const { newIndex } = evt
  const placeholder = props.children![newIndex]

  if (placeholder && placeholder.type && !placeholder.id) {
    props.children!.splice(newIndex, 1)
    if (props.parentId) {
      designer.addComponent(placeholder.type, newIndex, props.parentId)
    }
  }
}
</script>

<style scoped>
.panel-field {
  width: 100%;
}

.panel-header {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.panel-content {
  min-height: 80px;
  position: relative;
}

.panel-drop-zone {
  min-height: 80px;
}

.panel-empty {
  color: #909399;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
</style>
