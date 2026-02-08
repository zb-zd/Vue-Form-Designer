# 表单设计器需求文档 (Vue 3 实现版)

## 一、项目概述

### 1.1 项目名称
VueForm Designer - 可视化表单设计器

### 1.2 技术栈
- **前端框架**: Vue 3 + Composition API + TypeScript
- **构建工具**: Vite
- **UI组件库**: Element Plus (或根据团队选择)
- **拖拽库**: Vue Draggable Next / SortableJS
- **状态管理**: Pinia
- **可视化**: 可选 Konva.js / Fabric.js (复杂设计) 或纯CSS布局
- **代码编辑器**: Monaco Editor (JSON编辑)
- **图标库**: Element Plus Icons / IconPark

### 1.3 目标用户
- 企业内部系统管理员
- 低代码平台开发者
- 需要快速创建表单的业务人员

## 二、功能需求明细

### 2.1 核心模块

#### M1: 设计器工作区
| 功能点 | 优先级 | 技术实现要点 |
|--------|--------|--------------|
| **画布编辑器** | P0 | Vue组件 + CSS Grid/Flex |
| - 拖拽放置组件 | P0 | Vue Draggable + 组件注册表 |
| - 网格对齐 (8px基准) | P1 | CSS Grid + 吸附计算 |
| - 组件多选/框选 | P1 | SelectionManager类 |
| - 键盘快捷键 | P1 | useKeyboardShortcuts composable |
| **组件树面板** | P0 | Tree组件 + 递归组件 |
| - 层级结构展示 | P0 | NestedComponents数据结构 |
| - 快速定位组件 | P1 | 虚拟滚动 (vue-virtual-scroller) |
| **属性配置面板** | P0 | 动态表单生成器 |
| - 实时属性编辑 | P0 | watch + 双向绑定 |
| - 条件配置界面 | P1 | RuleEngine类 + 表达式解析 |

#### M2: 组件库系统
```typescript
// 组件元数据接口
interface ComponentMeta {
  id: string;
  name: string;
  icon: string;
  category: 'input' | 'layout' | 'advanced';
  preview: () => JSX.Element;
  render: (props: any) => JSX.Element;
  props: ComponentProp[];
  defaultSize: { width: number; height: number };
}
```

**基础组件 (P0)**:
1. 输入框 (Input)
2. 数字输入框 (InputNumber)
3. 文本域 (Textarea)
4. 下拉选择 (Select)
5. 单选框组 (RadioGroup)
6. 复选框组 (CheckboxGroup)
7. 日期选择器 (DatePicker)
8. 时间选择器 (TimePicker)
9. 开关 (Switch)
10. 滑块 (Slider)
11. 文件上传 (Upload)

**布局组件 (P1)**:
1. 栅格布局 (Row/Col)
2. 分组面板 (Collapse)
3. 标签页 (Tabs)
4. 分割线 (Divider)
5. 卡片容器 (Card)

**高级组件 (P2)**:
1. 表格编辑器 (Table)
2. 富文本编辑器 (Quill)
3. 代码编辑器 (Monaco)
4. 动态数据选择器

#### M3: 数据与逻辑引擎
```typescript
// 数据绑定系统
interface DataBinding {
  type: 'static' | 'api' | 'expression';
  value: any;
  options?: {
    apiUrl?: string;
    method?: 'GET' | 'POST';
    params?: Record<string, any>;
  };
}

// 验证规则系统
const validators = {
  required: (value: any) => boolean,
  pattern: (value: any, regex: RegExp) => boolean,
  custom: (value: any, fn: Function) => boolean
}
```

**核心功能**:
1. 字段关联与联动 (P0)
2. 条件显示/隐藏 (P0)
3. 动态数据源 (P1)
4. 计算字段 (P2)
5. 表单验证引擎 (P0)

#### M4: 主题与样式系统
```typescript
// 主题配置接口
interface ThemeConfig {
  colors: {
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
  spacing: {
    base: number; // 8px
    sm: number;
    md: number;
    lg: number;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
}
```

**功能点**:
1. 全局主题配置器 (P1)
2. 组件样式自定义 (P1)
3. CSS代码编辑器 (P2)
4. 响应式断点配置 (P2)

### 2.2 输出与集成

#### M5: 表单输出系统
```typescript
// 输出格式定义
interface FormOutput {
  // 表单定义 (Schema)
  schema: {
    version: string;
    fields: FormField[];
    layout: LayoutConfig[];
    settings: FormSettings;
  };
  
  // 运行时配置
  runtime: {
    validators: ValidatorConfig[];
    dependencies: FieldDependency[];
    events: FormEvent[];
  };
  
  // 渲染器配置
  renderer: {
    framework: 'vue3' | 'react' | 'html';
    components: ComponentMapping[];
  };
}
```

**输出方式**:
1. **Vue组件代码生成** (P0)
2. **JSON Schema导出** (P0)
3. **HTML+JS独立运行** (P1)
4. **TypeScript类型定义** (P1)
5. **OpenAPI/Swagger集成** (P2)

#### M6: 预览与测试
1. 实时预览面板 (P0)
2. 设备模拟器 (手机/平板/桌面) (P1)
3. 表单数据模拟 (P1)
4. 验证规则测试工具 (P2)

### 2.3 协作与项目管理

#### M7: 项目管理
1. 本地存储自动保存 (P0)
2. 表单模板库 (P1)
3. 版本历史管理 (P2)
4. 团队协作 (P3)

## 三、技术架构设计

### 3.1 项目结构
```
src/
├── components/           # 通用组件
│   ├── designer/        # 设计器专用组件
│   ├── fields/          # 表单字段组件
│   └── ui/              # UI组件
├── composables/         # Composition API
│   ├── useFormDesigner.ts
│   ├── useComponentRegistry.ts
│   ├── useDraggable.ts
│   └── useValidator.ts
├── stores/              # Pinia stores
│   ├── designer.ts      # 设计器状态
│   ├── component.ts     # 组件库
│   └── project.ts       # 项目管理
├── core/                # 核心逻辑
│   ├── engine/          # 表单引擎
│   ├── schema/          # Schema管理
│   ├── validator/       # 验证引擎
│   └── generator/       # 代码生成器
├── types/               # TypeScript定义
├── utils/               # 工具函数
└── plugins/             # 插件系统
```

### 3.2 核心数据结构
```typescript
// 表单设计器状态
interface DesignerState {
  // 当前编辑的表单
  currentForm: FormSchema;
  
  // 画布状态
  canvas: {
    scale: number;
    width: number;
    height: number;
    selectedIds: string[];
    hoveredId: string | null;
  };
  
  // 组件树
  componentTree: ComponentTreeNode[];
  
  // 历史记录
  history: {
    past: FormSchema[];
    future: FormSchema[];
    maxLength: number;
  };
}

// 组件节点
interface ComponentNode {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  children?: ComponentNode[];
  parentId?: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
```

### 3.3 关键Composables设计
```typescript
// useFormDesigner - 核心设计器逻辑
export function useFormDesigner() {
  const state = reactive<DesignerState>({...});
  
  // 组件操作
  const addComponent = (component: ComponentMeta, position: Position) => {};
  const removeComponent = (id: string) => {};
  const updateComponent = (id: string, updates: Partial<ComponentNode>) => {};
  
  // 画布操作
  const zoomIn = () => {};
  const zoomOut = () => {};
  const selectAll = () => {};
  
  // 历史记录
  const undo = () => {};
  const redo = () => {};
  
  return {
    state,
    addComponent,
    removeComponent,
    // ...其他方法
  };
}

// useComponentRegistry - 组件注册管理
export function useComponentRegistry() {
  const components = ref<Record<string, ComponentMeta>>({});
  
  const register = (component: ComponentMeta) => {};
  const unregister = (name: string) => {};
  const getComponent = (name: string) => {};
  
  return { components, register, unregister, getComponent };
}
```

## 四、开发里程碑

### 阶段1: MVP (2-3周)
- [ ] 项目初始化 (Vue 3 + Vite + TypeScript)
- [ ] 基础拖拽功能实现
- [ ] 5个基础表单组件
- [ ] JSON Schema输出
- [ ] 基本属性编辑

### 阶段2: 核心功能 (3-4周)
- [ ] 完整组件库 (20+组件)
- [ ] 数据验证系统
- [ ] 条件逻辑配置
- [ ] Vue代码生成器
- [ ] 实时预览

### 阶段3: 高级功能 (3-4周)
- [ ] 主题系统
- [ ] 响应式设计
- [ ] 高级布局组件
- [ ] 历史版本管理
- [ ] 模板系统

### 阶段4: 优化与扩展 (2-3周)
- [ ] 性能优化
- [ ] 插件系统
- [ ] 团队协作功能
- [ ] 文档完善

## 五、性能与优化

### 5.1 性能指标
- 初始加载时间 < 3s
- 画布操作响应 < 100ms
- 支持100+组件的表单
- 内存占用 < 200MB

### 5.2 优化策略
1. **组件懒加载**: 动态导入组件
2. **虚拟滚动**: 组件树大量数据
3. **操作防抖**: 频繁的属性更新
4. **本地缓存**: 自动保存机制
5. **Web Worker**: 复杂计算任务

## 六、测试策略

### 6.1 测试类型
- **单元测试**: Vitest + Vue Test Utils (覆盖率 > 80%)
- **组件测试**: 关键UI组件
- **集成测试**: 设计器工作流
- **E2E测试**: Cypress (关键路径)

### 6.2 测试重点
1. 组件拖拽与布局
2. JSON Schema生成正确性
3. 数据验证逻辑
4. 代码生成器输出

## 七、部署与维护

### 7.1 部署方案
- **开发环境**: Vite Dev Server
- **生产环境**: Nginx + Docker
- **CDN**: 静态资源加速

### 7.2 监控指标
- 页面加载性能
- 用户操作成功率
- 错误收集 (Sentry)
- 使用统计 (自定义埋点)

## 八、扩展性设计

### 8.1 插件系统架构
```typescript
interface Plugin {
  name: string;
  version: string;
  install: (designer: FormDesigner) => void;
  uninstall?: () => void;
}

// 插件类型
type PluginType = 
  | 'component'    // 扩展组件
  | 'validator'    // 扩展验证器
  | 'exporter'     // 扩展导出器
  | 'theme'        // 扩展主题
  | 'tool'         // 扩展工具
```

### 8.2 API设计
```typescript
// 设计器API
const designerAPI = {
  // 组件管理
  components: { register, unregister, list },
  
  // 表单操作
  form: { getSchema, updateSchema, validate },
  
  // 工具函数
  utils: { generateCode, exportJSON, importJSON },
  
  // 事件系统
  events: { on, off, emit }
};
```

## 九、风险与应对

| 风险点 | 可能性 | 影响 | 应对措施 |
|--------|--------|------|----------|
| 复杂表单性能问题 | 中 | 高 | 虚拟化、懒加载、性能监控 |
| 浏览器兼容性 | 低 | 中 | 明确支持范围，提供降级方案 |
| 组件库扩展困难 | 中 | 中 | 设计良好的插件系统 |
| 数据丢失风险 | 低 | 高 | 自动保存 + 本地备份 |
| 学习曲线陡峭 | 中 | 低 | 完善的文档和示例 |

## 十、附录

### 10.1 相关技术文档链接
- Vue 3官方文档
- Element Plus组件库
- JSON Schema规范
- Vite构建工具

### 10.2 参考项目
- Formily (阿里)
- VForm (Vue 2表单设计器)
- vue-form-making
- Amis (百度低代码)

---

**文档版本**: 1.0  
**最后更新**: 2024年1月  
**下一步行动**:  
1. 确认技术选型和UI组件库  
2. 搭建基础项目框架  
3. 实现拖拽MVP原型

需要我详细说明某个具体功能的技术实现方案吗？