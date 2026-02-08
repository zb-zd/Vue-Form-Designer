# 属性组件系统

这是一个基于 `import.meta.glob` 的自动化属性组件系统，通过约定的命名规则实现属性组件的自动加载和映射。

## 核心理念

**约定优于配置**：每个属性对应一个独立的 Vue 组件，通过命名约定自动关联。

## 命名规则

属性组件的命名遵循以下规则：

```
{PropName}Prop.vue
```

- `PropName`：属性名的 PascalCase 形式
- `Prop`：固定后缀
- `.vue`：Vue 组件文件扩展名

### 命名示例

| 属性名 | 组件文件名 | 说明 |
|--------|-----------|------|
| `label` | `LabelProp.vue` | 字段标签 |
| `placeholder` | `PlaceholderProp.vue` | 占位提示 |
| `required` | `RequiredProp.vue` | 是否必填 |
| `disabled` | `DisabledProp.vue` | 是否禁用 |
| `maxlength` | `MaxlengthProp.vue` | 最大长度 |
| `showWordLimit` | `ShowWordLimitProp.vue` | 显示字数统计 |
| `options` | `OptionsProp.vue` | 选项配置 |

## 工作原理

### 1. 自动加载

使用 Vite 的 `import.meta.glob` API 自动加载所有属性组件：

```typescript
// src/components/props/index.ts
const propModules = import.meta.glob<{ default: Component }>('./*.vue', { eager: true })
```

### 2. 自动注册

遍历加载的模块，根据文件名自动注册到组件映射表：

```typescript
// LabelProp.vue -> label
// ShowWordLimitProp.vue -> showWordLimit
Object.entries(propModules).forEach(([path, module]) => {
  const fileName = path.replace(/^\.\//, '').replace(/\.vue$/, '')
  if (fileName.endsWith('Prop')) {
    const propName = fileName.replace(/Prop$/, '')
    const propKey = propName.charAt(0).toLowerCase() + propName.slice(1)
    propComponents[propKey] = module.default
  }
})
```

### 3. 动态渲染

PropEditor 组件根据属性名动态加载对应的组件：

```vue
<component
  :is="propComponent"
  v-if="propComponent"
  :model-value="modelValue"
  @update:model-value="handleChange"
/>
```

## 组件规范

所有属性组件必须遵循以下规范：

### 1. Props

```typescript
interface Props {
  modelValue?: any  // 必须：当前值
  // 其他可选 props...
}
```

### 2. Emits

```typescript
const emit = defineEmits<{
  'update:modelValue': [value: any]  // 必须：支持 v-model
}>()
```

### 3. 示例

```vue
<!-- LabelProp.vue -->
<template>
  <el-input
    :model-value="modelValue"
    placeholder="请输入字段标签"
    @input="handleChange"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleChange(value: string) {
  emit('update:modelValue', value)
}
</script>
```

## 已实现的属性组件

| 组件 | 属性名 | 类型 | 说明 |
|------|--------|------|------|
| LabelProp.vue | label | string | 字段标签 |
| PlaceholderProp.vue | placeholder | string | 占位提示 |
| RequiredProp.vue | required | boolean | 是否必填 |
| DisabledProp.vue | disabled | boolean | 是否禁用 |
| ClearableProp.vue | clearable | boolean | 可清空 |
| MaxlengthProp.vue | maxlength | number | 最大长度 |
| ShowWordLimitProp.vue | showWordLimit | boolean | 显示字数统计 |
| MinProp.vue | min | number | 最小值 |
| MaxProp.vue | max | number | 最大值 |
| StepProp.vue | step | number | 步进值 |
| RowsProp.vue | rows | number | 文本域行数 |
| OptionsProp.vue | options | array | 选项配置 |

## 如何添加新的属性组件

### 步骤 1：创建组件文件

在 `src/components/props/` 目录下创建新的组件文件，遵循命名规则：

```bash
# 例如：添加 multiple（多选）属性
touch src/components/props/MultipleProp.vue
```

### 步骤 2：实现组件

```vue
<!-- MultipleProp.vue -->
<template>
  <el-switch
    :model-value="modelValue"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleChange(value: boolean) {
  emit('update:modelValue', value)
}
</script>
```

### 步骤 3：在配置中使用

在 `src/config/propConfigs.ts` 中添加配置：

```typescript
export const selectPropConfigs: PropConfig[] = [
  // ...其他配置
  {
    name: 'multiple',  // 属性名，会自动匹配 MultipleProp.vue
    label: '多选',
    type: 'switch',    // type 字段已废弃，保留是为了兼容
    defaultValue: false,
    group: 'basic'
  }
]
```

### 步骤 4：自动生效

无需任何额外配置，系统会自动：
1. 加载 `MultipleProp.vue` 组件
2. 注册到 `propComponents['multiple']`
3. 在属性面板中自动渲染

## 优势

### 1. 零配置
- 创建组件文件即可，无需手动注册
- 无需在 PropEditor 中添加条件判断

### 2. 高度解耦
- 每个属性组件完全独立
- 易于测试和维护

### 3. 易于扩展
- 添加新属性只需创建一个文件
- 支持团队协作，避免冲突

### 4. 类型安全
- TypeScript 支持
- 编译时检查

### 5. 按需加载
- 使用 `eager: true` 预加载所有组件
- 也可以改为懒加载以优化性能

## 调试

开发环境下，控制台会打印已注册的属性组件：

```
📦 已注册的属性组件: ['label', 'placeholder', 'required', 'disabled', ...]
```

## API

### getPropComponent(propName: string)

获取属性组件：

```typescript
import { getPropComponent } from '@/components/props'

const LabelComponent = getPropComponent('label')
```

### hasPropComponent(propName: string)

检查属性组件是否存在：

```typescript
import { hasPropComponent } from '@/components/props'

if (hasPropComponent('label')) {
  // 组件存在
}
```

### getAllPropNames()

获取所有已注册的属性名：

```typescript
import { getAllPropNames } from '@/components/props'

const propNames = getAllPropNames()
// ['label', 'placeholder', 'required', ...]
```

## 降级处理

如果找不到对应的属性组件，PropEditor 会自动降级为默认的输入框：

```vue
<!-- 降级：如果没有找到对应的属性组件，显示默认输入框 -->
<el-input
  v-else
  :model-value="modelValue"
  :placeholder="config.placeholder"
  @input="handleChange"
/>
```

## 最佳实践

1. **保持组件简单**：每个属性组件只负责一个属性的编辑
2. **遵循命名规则**：确保文件名符合 `{PropName}Prop.vue` 格式
3. **统一接口**：所有组件都支持 `v-model`
4. **添加注释**：在组件中说明属性的用途
5. **考虑复用**：相似的属性可以共用同一个组件

## 迁移指南

从旧的 propEditors 系统迁移到新的 props 系统：

### 旧系统（propEditors）
```
src/components/propEditors/
├── InputEditor.vue      # 通用文本输入编辑器
├── NumberEditor.vue     # 通用数字输入编辑器
├── SwitchEditor.vue     # 通用开关编辑器
└── ...
```

### 新系统（props）
```
src/components/props/
├── LabelProp.vue        # 专门的 label 属性组件
├── PlaceholderProp.vue  # 专门的 placeholder 属性组件
├── RequiredProp.vue     # 专门的 required 属性组件
└── ...
```

新系统更加语义化，每个组件对应一个具体的属性，而不是一个通用的编辑器类型。
