import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ComponentNode } from '@/types'
import { generateId } from '@/utils/idGenerator'
import { getDefaultProps } from '@/utils/defaultProps'
import { useComponentRegistryStore } from './componentRegistry'

export const useDesignerStore = defineStore('designer', () => {
  // State
  const components = ref<ComponentNode[]>([])
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)

  // 辅助函数：递归查找组件
  function findComponentById(id: string, list: ComponentNode[] = components.value): ComponentNode | null {
    for (const component of list) {
      if (component.id === id) {
        return component
      }
      if (component.children) {
        const found = findComponentById(id, component.children)
        if (found) return found
      }
    }
    return null
  }

  // 辅助函数：递归查找组件的父容器
  function findParentContainer(childId: string, list: ComponentNode[] = components.value, parent: ComponentNode | null = null): ComponentNode | null {
    for (const component of list) {
      if (component.id === childId) {
        return parent
      }
      if (component.children) {
        const found = findParentContainer(childId, component.children, component)
        if (found !== undefined) return found
      }
    }
    return undefined as any
  }

  // Computed
  const selectedComponent = computed(() => {
    if (!selectedId.value) return null
    return findComponentById(selectedId.value)
  })

  // Actions
  function addComponent(type: string, index?: number, parentId?: string) {
    const componentRegistry = useComponentRegistryStore()
    const componentMeta = componentRegistry.getComponent(type)

    const id = generateId(type)
    const newComponent: ComponentNode = {
      id,
      type,
      props: getDefaultProps(type)
    }

    // 如果是容器组件，初始化 children 数组
    if (componentMeta?.isContainer) {
      newComponent.children = []
    }

    // 如果指定了父容器，添加到父容器的 children 中
    if (parentId) {
      const parent = findComponentById(parentId)
      if (parent && parent.children) {
        if (typeof index === 'number' && index >= 0 && index <= parent.children.length) {
          parent.children.splice(index, 0, newComponent)
        } else {
          parent.children.push(newComponent)
        }
      }
    } else {
      // 否则添加到根级组件列表
      if (typeof index === 'number' && index >= 0 && index <= components.value.length) {
        components.value.splice(index, 0, newComponent)
      } else {
        components.value.push(newComponent)
      }
    }

    selectedId.value = id
  }

  function removeComponent(id: string) {
    // 递归删除函数
    function removeFromList(list: ComponentNode[]): boolean {
      const index = list.findIndex(c => c.id === id)
      if (index !== -1) {
        list.splice(index, 1)
        return true
      }

      // 在子组件中查找
      for (const component of list) {
        if (component.children && removeFromList(component.children)) {
          return true
        }
      }
      return false
    }

    if (removeFromList(components.value)) {
      if (selectedId.value === id) {
        selectedId.value = null
      }
    }
  }

  function updateComponent(id: string, props: Record<string, any>) {
    const component = findComponentById(id)
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

  function moveComponentToContainer(
    fromIndex: number,
    fromParentId: string | null,
    toParentId: string,
    toIndex?: number
  ) {
    // Find source list (root or parent's children)
    const sourceList = fromParentId
      ? findComponentById(fromParentId)?.children
      : components.value

    if (!sourceList || fromIndex < 0 || fromIndex >= sourceList.length) return

    // Find target container
    const targetContainer = findComponentById(toParentId)
    if (!targetContainer || !targetContainer.children) return

    // Prevent dragging a container into itself or its descendants
    const movedComponent = sourceList[fromIndex]
    if (movedComponent.id === toParentId || isDescendant(movedComponent.id, toParentId)) {
      return
    }

    // Remove from source
    const [component] = sourceList.splice(fromIndex, 1)

    // Insert into target
    const insertIndex = toIndex ?? targetContainer.children.length
    targetContainer.children.splice(insertIndex, 0, component)
  }

  function isDescendant(ancestorId: string, descendantId: string): boolean {
    const ancestor = findComponentById(ancestorId)
    if (!ancestor?.children) return false

    for (const child of ancestor.children) {
      if (child.id === descendantId) return true
      if (isDescendant(child.id, descendantId)) return true
    }
    return false
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
    moveComponent,
    moveComponentToContainer,
    // Helper functions
    findComponentById,
    findParentContainer
  }
})
