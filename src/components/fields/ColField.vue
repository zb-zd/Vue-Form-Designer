<template>
  <div class="col-field">
    <el-col :span="span" :offset="offset">
      <div class="col-content">
        <VueDraggable
          :model-value="children"
          :group="{ name: 'components' }"
          item-key="id"
          class="col-drop-zone"
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

        <div v-if="!children || children.length === 0" class="col-empty">
          拖入组件到此处
        </div>
      </div>
    </el-col>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import type { ComponentNode } from '@/types'
import CanvasItem from '@/components/designer/CanvasItem.vue'
import { useDesignerStore } from '@/stores/designer'

interface Props {
  span?: number
  offset?: number
  children?: ComponentNode[]
  parentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  span: 12,
  offset: 0,
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
.col-field {
  width: 100%;
}

.col-content {
  min-height: 50px;
  padding: 8px;
  border: 1px dashed #e4e7ed;
  border-radius: 4px;
  background: #fff;
  position: relative;
}

.col-drop-zone {
  min-height: 34px;
}

.col-empty {
  color: #c0c4cc;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  pointer-events: none;
}
</style>
