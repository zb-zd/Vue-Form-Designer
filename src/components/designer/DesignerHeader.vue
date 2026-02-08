<template>
  <div class="designer-header">
    <div class="header-left">
      <h1 class="title">表单设计器</h1>
    </div>
    <div class="header-right">
      <el-button :icon="View" @click="handlePreview">
        预览
      </el-button>
      <el-button :icon="Upload" @click="handleImport">
        导入模板
      </el-button>
      <el-button
        v-if="designer.components.length > 0"
        type="primary"
        :icon="Download"
        @click="handleExport"
      >
        导出模板
      </el-button>
      <el-button
        v-if="designer.components.length > 0"
        type="danger"
        :icon="Delete"
        @click="handleClearAll"
      >
        清空画布
      </el-button>
    </div>

    <!-- 导入文件上传（隐藏） -->
    <el-upload
      ref="uploadRef"
      :show-file-list="false"
      accept=".json"
      :before-upload="handleImportFile"
      style="display: none;"
    />

    <!-- JSON 导出对话框 -->
    <el-dialog
      v-model="showExportDialog"
      title="导出表单模板"
      width="70%"
      :close-on-click-modal="false"
    >
      <div class="json-preview">
        <el-input
          v-model="jsonContent"
          type="textarea"
          :rows="20"
          readonly
          class="json-textarea"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showExportDialog = false">关闭</el-button>
          <el-button type="primary" @click="handleCopyJson">复制 JSON</el-button>
          <el-button type="success" :icon="Download" @click="handleDownloadJson">
            下载文件
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 预览对话框 -->
    <el-dialog
      v-model="showPreviewDialog"
      title="表单预览"
      width="70%"
      :close-on-click-modal="false"
    >
      <div class="preview-container">
        <el-form
          ref="previewFormRef"
          :model="formData"
          label-width="120px"
          label-position="right"
        >
          <component
            v-for="component in designer.components"
            :key="component.id"
            :is="getFieldComponent(component.type)"
            v-bind="component.props"
            v-model="formData[component.id]"
            :mode="'preview'"
          />
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showPreviewDialog = false">关闭</el-button>
          <el-button type="primary" @click="handleValidate">验证表单</el-button>
          <el-button type="success" :icon="View" @click="handleViewFormData">
            查看表单数据
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 表单数据预览对话框 -->
    <el-dialog
      v-model="showFormDataDialog"
      title="表单数据"
      width="70%"
      :close-on-click-modal="false"
    >
      <div class="json-preview">
        <el-input
          v-model="formDataJson"
          type="textarea"
          :rows="20"
          readonly
          class="json-textarea"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showFormDataDialog = false">关闭</el-button>
          <el-button type="primary" @click="handleCopyFormData">复制 JSON</el-button>
          <el-button type="success" :icon="Download" @click="handleDownloadFormData">
            下载文件
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { View, Download, Upload, Delete } from '@element-plus/icons-vue'
import type { UploadRawFile, FormInstance } from 'element-plus'
import { useDesignerStore } from '@/stores/designer'
import { exportFormSchema, downloadJSON, importFormSchema } from '@/utils/formExport'
import { fieldComponents } from '@/components/fields'

const designer = useDesignerStore()

// 导出相关
const showExportDialog = ref(false)
const jsonContent = ref('')
const currentSchema = ref<any>(null)

// 预览相关
const showPreviewDialog = ref(false)
const formData = ref<Record<string, any>>({})
const previewFormRef = ref<FormInstance>()

// 表单数据预览
const showFormDataDialog = ref(false)
const formDataJson = ref('')

// 上传引用
const uploadRef = ref()

// 获取字段组件
function getFieldComponent(type: string) {
  return fieldComponents[type]
}

// 预览表单
function handlePreview() {
  if (designer.components.length === 0) {
    ElMessage.warning('画布为空，无法预览')
    return
  }

  // 初始化表单数据
  formData.value = {}
  designer.components.forEach(component => {
    formData.value[component.id] = undefined
  })

  showPreviewDialog.value = true
}

// 验证表单
async function handleValidate() {
  if (!previewFormRef.value) return

  try {
    await previewFormRef.value.validate()
    ElMessage.success('表单验证通过！')
  } catch (error) {
    ElMessage.error('表单验证失败，请检查必填项')
  }
}

// 查看表单数据
function handleViewFormData() {
  const data = {
    timestamp: new Date().toISOString(),
    formData: formData.value
  }
  formDataJson.value = JSON.stringify(data, null, 2)
  showFormDataDialog.value = true
}

// 复制表单数据
async function handleCopyFormData() {
  try {
    await navigator.clipboard.writeText(formDataJson.value)
    ElMessage.success('表单数据已复制到剪贴板！')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制')
    console.error('复制错误:', error)
  }
}

// 下载表单数据
function handleDownloadFormData() {
  try {
    const data = JSON.parse(formDataJson.value)
    const filename = `form-data-${Date.now()}.json`
    downloadJSON(data, filename)
    ElMessage.success('表单数据下载成功！')
  } catch (error) {
    ElMessage.error('下载失败，请重试')
    console.error('下载错误:', error)
  }
}

// 导出模板
function handleExport() {
  try {
    const schema = exportFormSchema(designer.components)
    currentSchema.value = schema
    jsonContent.value = JSON.stringify(schema, null, 2)
    showExportDialog.value = true
  } catch (error) {
    ElMessage.error('导出失败，请重试')
    console.error('导出错误:', error)
  }
}

// 复制 JSON
async function handleCopyJson() {
  try {
    await navigator.clipboard.writeText(jsonContent.value)
    ElMessage.success('JSON 已复制到剪贴板！')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制')
    console.error('复制错误:', error)
  }
}

// 下载 JSON
function handleDownloadJson() {
  try {
    const filename = `form-template-${Date.now()}.json`
    downloadJSON(currentSchema.value, filename)
    ElMessage.success('表单模板下载成功！')
    showExportDialog.value = false
  } catch (error) {
    ElMessage.error('下载失败，请重试')
    console.error('下载错误:', error)
  }
}

// 导入模板
function handleImport() {
  uploadRef.value?.$el.querySelector('input').click()
}

// 处理文件导入
function handleImportFile(file: UploadRawFile) {
  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      const components = importFormSchema(content)

      if (components.length === 0) {
        ElMessage.warning('导入的模板为空或格式不正确')
        return
      }

      designer.components = components
      designer.clearSelection()
      ElMessage.success(`成功导入 ${components.length} 个组件！`)
    } catch (error) {
      ElMessage.error('导入失败，请检查文件格式')
      console.error('导入错误:', error)
    }
  }

  reader.onerror = () => {
    ElMessage.error('文件读取失败')
  }

  reader.readAsText(file)

  // 阻止默认上传行为
  return false
}

// 清空画布
async function handleClearAll() {
  try {
    await ElMessageBox.confirm(
      '确定要清空画布吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    designer.components = []
    designer.clearSelection()
    ElMessage.success('画布已清空')
  } catch {
    // User cancelled
  }
}
</script>

<style scoped>
.designer-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.header-right {
  display: flex;
  gap: 12px;
}

.json-preview {
  margin: 16px 0;
}

.json-textarea :deep(.el-textarea__inner) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  font-size: 13px;
  line-height: 1.6;
  background-color: #f5f7fa;
  color: #303133;
}

.preview-container {
  padding: 24px;
  background: #f5f7fa;
  border-radius: 4px;
  max-height: 60vh;
  overflow-y: auto;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
