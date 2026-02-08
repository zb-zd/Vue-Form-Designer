import type { ComponentNode } from './component'

/**
 * Designer state
 */
export interface DesignerState {
  components: ComponentNode[]
  selectedId: string | null
  hoveredId: string | null
}

/**
 * Canvas state
 */
export interface CanvasState {
  scale: number
  width: number
  height: number
}
