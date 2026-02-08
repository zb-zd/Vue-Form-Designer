import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ComponentNode } from '@/types'
import { generateId } from '@/utils/idGenerator'
import { getDefaultProps } from '@/utils/defaultProps'

export const useDesignerStore = defineStore('designer', () => {
  // State
  const components = ref<ComponentNode[]>([])
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)

  // Computed
  const selectedComponent = computed(() => {
    if (!selectedId.value) return null
    return components.value.find(c => c.id === selectedId.value) || null
  })

  // Actions
  function addComponent(type: string, index?: number) {
    const id = generateId(type)
    const newComponent: ComponentNode = {
      id,
      type,
      props: getDefaultProps(type)
    }

    // 如果指定了索引，插入到指定位置；否则添加到末尾
    if (typeof index === 'number' && index >= 0 && index <= components.value.length) {
      components.value.splice(index, 0, newComponent)
    } else {
      components.value.push(newComponent)
    }

    selectedId.value = id
  }

  function removeComponent(id: string) {
    const index = components.value.findIndex(c => c.id === id)
    if (index !== -1) {
      components.value.splice(index, 1)
      if (selectedId.value === id) {
        selectedId.value = null
      }
    }
  }

  function updateComponent(id: string, props: Record<string, any>) {
    const component = components.value.find(c => c.id === id)
    if (component) {
      component.props = { ...component.props, ...props }
    }
  }

  function selectComponent(id: string | null) {
    selectedId.value = id
  }

  function setHoveredId(id: string | null) {
    hoveredId.value = id
  }

  function clearSelection() {
    selectedId.value = null
  }

  function moveComponent(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return
    if (fromIndex < 0 || fromIndex >= components.value.length) return
    if (toIndex < 0 || toIndex > components.value.length) return

    const [movedComponent] = components.value.splice(fromIndex, 1)

    // 删除元素后，如果目标位置在原位置之后，索引会自动减1，所以直接插入即可
    const finalIndex = toIndex > fromIndex ? toIndex - 1 : toIndex
    components.value.splice(finalIndex, 0, movedComponent)
  }

  return {
    // State
    components,
    selectedId,
    hoveredId,
    // Computed
    selectedComponent,
    // Actions
    addComponent,
    removeComponent,
    updateComponent,
    selectComponent,
    setHoveredId,
    clearSelection,
    moveComponent
  }
})
