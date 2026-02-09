<template>
  <div class="grid-field">
    <el-row :gutter="gutter" :justify="justify" :align="align">
      <el-col
        v-for="colIndex in cols"
        :key="colIndex"
        :span="24 / cols"
        class="grid-col"
      >
        <VueDraggable
          v-model="colModels[colIndex - 1]"
          :group="{ name: 'components' }"
          item-key="id"
          class="grid-col-content"
          @add="(evt) => handleColAdd(evt, colIndex - 1)"
        >
          <template #item="{ element }">
            <CanvasItem
              :component="element"
              :index="0"
              :parent-id="parentId"
            />
          </template>
        </VueDraggable>

        <div v-if="getColChildren(colIndex - 1).length === 0" class="grid-col-empty">
          拖入组件
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { ComponentNode } from '@/types'
import CanvasItem from '@/components/designer/CanvasItem.vue'
import { useDesignerStore } from '@/stores/designer'

interface Props {
  cols?: number
  gutter?: number
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom'
  children?: ComponentNode[]
  parentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: 2,
  gutter: 16,
  justify: 'start',
  align: 'top',
  children: () => []
})

const designer = useDesignerStore()

function getColChildren(colIndex: number) {
  if (!props.children) return []
  return props.children.filter(child => (child.colIndex ?? 0) === colIndex)
}

// 为每个列创建可写的计算属性
const colModels = computed({
  get: () => {
    const models: ComponentNode[][] = []
    for (let i = 0; i < props.cols; i++) {
      models.push(getColChildren(i))
    }
    console.log('colModels get:', models)
    return models
  },
  set: (newModels: ComponentNode[][]) => {
    console.log('colModels set:', newModels)
    // 当 VueDraggable 修改列数据时，重建整个 children 数组
    const allChildren: ComponentNode[] = []
    newModels.forEach((colChildren, colIndex) => {
      colChildren.forEach(child => {
        child.colIndex = colIndex
        allChildren.push(child)
      })
    })
    console.log('allChildren:', allChildren)
    // 替换整个 children 数组
    props.children!.splice(0, props.children!.length, ...allChildren)
  }
})

function handleColAdd(evt: any, colIndex: number) {
  const { newIndex } = evt

  console.log('handleColAdd', colIndex, newIndex, 'children:', props.children)

  // 直接从 children 中查找刚添加的占位符
  // vue-draggable-plus 会把占位符添加到数组中，但还没有设置 colIndex
  const placeholder = props.children!.find(child => !child.colIndex && child.colIndex !== 0)

  console.log('handleColAdd placeholder:', placeholder)

  // 检查是否是从组件库克隆的（只有 type，没有 id）
  if (placeholder && placeholder.type && !placeholder.id) {
    // 从组件库添加，移除占位符并创建真实组件
    const globalIndex = props.children!.indexOf(placeholder)
    props.children!.splice(globalIndex, 1)

    if (props.parentId) {
      designer.addComponent(placeholder.type, undefined, props.parentId)
      // 设置新组件的 colIndex
      const newComponent = props.children![props.children!.length - 1]
      if (newComponent) {
        newComponent.colIndex = colIndex
      }
    }
  } else if (placeholder && placeholder.id) {
    // 从其他地方移动过来，更新 colIndex
    placeholder.colIndex = colIndex
  }
}
</script>

<style scoped>
.grid-field {
  width: 100%;
  min-height: 80px;
}

.grid-col {
  min-height: 60px;
}

.grid-col-content {
  min-height: 60px;
  padding: 8px;
  border: 1px dashed #e4e7ed;
  border-radius: 4px;
  background: #fff;
}

.grid-col-content:empty::before {
  content: '拖入组件';
  color: #c0c4cc;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
}
</style>
