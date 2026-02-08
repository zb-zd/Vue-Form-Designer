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
  function addComponent(type: string) {
    const id = generateId(type)
    const newComponent: ComponentNode = {
      id,
      type,
      props: getDefaultProps(type)
    }
    components.value.push(newComponent)
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
    clearSelection
  }
})
