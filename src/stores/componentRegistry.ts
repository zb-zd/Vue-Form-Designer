import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ComponentMeta } from '@/types'

export const useComponentRegistryStore = defineStore('componentRegistry', () => {
  // State
  const components = ref<Record<string, ComponentMeta>>({})

  // Actions
  function register(component: ComponentMeta) {
    components.value[component.type] = component
  }

  function unregister(type: string) {
    delete components.value[type]
  }

  function getComponent(type: string): ComponentMeta | undefined {
    return components.value[type]
  }

  function getAllComponents(): ComponentMeta[] {
    return Object.values(components.value)
  }

  function getComponentsByCategory(category: string): ComponentMeta[] {
    return Object.values(components.value).filter(c => c.category === category)
  }

  return {
    // State
    components,
    // Actions
    register,
    unregister,
    getComponent,
    getAllComponents,
    getComponentsByCategory
  }
})
