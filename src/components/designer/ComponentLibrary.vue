<template>
  <div class="component-library">
    <div class="library-header">
      <h3>组件库</h3>
    </div>
    <div class="library-content">
      <div class="component-category">
        <div class="category-title">基础组件</div>
        <div class="component-list">
          <VueDraggable
            v-model="inputComponents"
            :group="{ name: 'components', pull: 'clone', put: false }"
            :sort="false"
            :clone="handleClone"
          >
            <div
              v-for="element in inputComponents"
              :key="element.type"
              class="component-item"
              @click="handleAddComponent(element.type)"
            >
              <el-icon class="component-icon">
                <component :is="element.icon" />
              </el-icon>
              <span class="component-name">{{ element.name }}</span>
            </div>
          </VueDraggable>
        </div>
      </div>

      <div class="component-category">
        <div class="category-title">布局容器</div>
        <div class="component-list">
          <VueDraggable
            v-model="layoutComponents"
            :group="{ name: 'components', pull: 'clone', put: false }"
            :sort="false"
            :clone="handleClone"
          >
            <div
              v-for="element in layoutComponents"
              :key="element.type"
              class="component-item"
              @click="handleAddComponent(element.type)"
            >
              <el-icon class="component-icon">
                <component :is="element.icon" />
              </el-icon>
              <span class="component-name">{{ element.name }}</span>
            </div>
          </VueDraggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useComponentRegistryStore } from '@/stores/componentRegistry'
import { useDesignerStore } from '@/stores/designer'

const componentRegistry = useComponentRegistryStore()
const designer = useDesignerStore()

const inputComponents = computed(() => {
  return componentRegistry.getComponentsByCategory('input')
})

const layoutComponents = computed(() => {
  return componentRegistry.getComponentsByCategory('layout')
})

function handleAddComponent(type: string) {
  designer.addComponent(type)
}

function handleClone(original: any) {
  return { type: original.type }
}
</script>

<style scoped>
.component-library {
  width: 250px;
  height: 100vh;
  background: #f5f7fa;
  border-right: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
}

.library-header {
  padding: 16px;
  border-bottom: 1px solid #dcdfe6;
  background: #fff;
}

.library-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.library-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.component-category {
  margin-bottom: 24px;
}

.category-title {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  margin-bottom: 12px;
}

.component-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: move;
  transition: all 0.3s;
  user-select: none;
  min-height: 80px;
}

.component-item:hover {
  border-color: #409eff;
  background: #ecf5ff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.component-icon {
  font-size: 28px;
  color: #409eff;
  margin-bottom: 8px;
}

.component-name {
  font-size: 13px;
  color: #303133;
  text-align: center;
  line-height: 1.4;
}
</style>
