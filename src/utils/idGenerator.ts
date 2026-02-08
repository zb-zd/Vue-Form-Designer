/**
 * Generate unique ID for components
 */
let counter = 0

export function generateId(prefix = 'component'): string {
  counter++
  return `${prefix}_${Date.now()}_${counter}`
}
