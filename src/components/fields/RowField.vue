<template>
  <div class="row-field">
    <el-row :gutter="gutter" :justify="justify" :align="align">
      <VueDraggable
        :model-value="children"
        :group="{ name: 'components' }"
        item-key="id"
        class="row-drop-zone"
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

      <div v-if="!children || children.length === 0" class="row-empty">
        拖入列组件到此处
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import type { ComponentNode } from '@/types'
import CanvasItem from '@/components/designer/CanvasItem.vue'
import { useDesignerStore } from '@/stores/designer'

interface Props {
  gutter?: number
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom'
  children?: ComponentNode[]
  parentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
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
.row-field {
  width: 100%;
  min-height: 60px;
  padding: 12px;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  background: #fafafa;
  position: relative;
}

.row-drop-zone {
  min-height: 36px;
  width: 100%;
}

.row-empty {
  color: #909399;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  pointer-events: none;
}
</style>
