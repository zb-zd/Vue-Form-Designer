<template>
  <div class="property-panel">
    <div class="panel-header">
      <h3>属性配置</h3>
    </div>
    <div class="panel-content">
      <div v-if="!designer.selectedComponent" class="panel-empty">
        <el-empty description="请选择组件" />
      </div>
      <div v-else class="property-form">
        <!-- 组件信息 -->
        <div class="component-info">
          <span class="component-type">{{ componentMeta?.name }}</span>
        </div>

        <!-- 基础属性 -->
        <el-collapse v-model="activeGroups" class="prop-collapse">
          <el-collapse-item title="基础属性" name="basic">
            <el-form label-width="90px" label-position="left" size="default">
              <el-form-item
                v-for="config in basicConfigs"
                :key="config.name"
                :label="config.label"
              >
                <PropEditor
                  :config="config"
                  :model-value="designer.selectedComponent.props[config.name]"
                  @update:model-value="handlePropChange(config.name, $event)"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <!-- 高级属性 -->
          <el-collapse-item
            v-if="advancedConfigs.length > 0"
            title="高级属性"
            name="advanced"
          >
            <el-form label-width="90px" label-position="left" size="default">
              <el-form-item
                v-for="config in advancedConfigs"
                :key="config.name"
                :label="config.label"
              >
                <PropEditor
                  :config="config"
                  :model-value="designer.selectedComponent.props[config.name]"
                  @update:model-value="handlePropChange(config.name, $event)"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDesignerStore } from '@/stores/designer'
import { useComponentRegistryStore } from '@/stores/componentRegistry'
import PropEditor from './PropEditor.vue'

const designer = useDesignerStore()
const componentRegistry = useComponentRegistryStore()

const activeGroups = ref(['basic', 'advanced'])

// 获取当前选中组件的元数据
const componentMeta = computed(() => {
  if (!designer.selectedComponent) return null
  return componentRegistry.getComponent(designer.selectedComponent.type)
})

// 获取基础属性配置
const basicConfigs = computed(() => {
  if (!componentMeta.value) return []
  return componentMeta.value.propConfigs.filter(
    config => !config.group || config.group === 'basic'
  )
})

// 获取高级属性配置
const advancedConfigs = computed(() => {
  if (!componentMeta.value) return []
  return componentMeta.value.propConfigs.filter(
    config => config.group === 'advanced'
  )
})

function handlePropChange(propName: string, value: any) {
  if (designer.selectedComponent) {
    designer.updateComponent(designer.selectedComponent.id, {
      [propName]: value
    })
  }
}
</script>

<style scoped>
.property-panel {
  width: 320px;
  height: 100vh;
  background: #f5f7fa;
  border-left: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid #dcdfe6;
  background: #fff;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
}

.panel-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

.property-form {
  padding: 16px;
}

.component-info {
  background: #fff;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.component-type {
  font-size: 14px;
  font-weight: 500;
  color: #409eff;
}

.prop-collapse {
  border: none;
}

.prop-collapse :deep(.el-collapse-item__header) {
  background: #fff;
  padding: 0 16px;
  font-weight: 500;
  border-radius: 4px;
}

.prop-collapse :deep(.el-collapse-item__wrap) {
  background: #fff;
  border-radius: 4px;
}

.prop-collapse :deep(.el-collapse-item__content) {
  padding: 16px;
}

.prop-collapse :deep(.el-collapse-item) {
  margin-bottom: 12px;
}
</style>
