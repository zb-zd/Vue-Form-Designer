# Vue Form Designer - 表单设计器

基于 Vue 3 + TypeScript + Element Plus 的可视化表单设计器 MVP 版本。

## 项目特性

- ✅ Vue 3 + Composition API + TypeScript
- ✅ Vite 构建工具
- ✅ Element Plus UI 组件库
- ✅ Pinia 状态管理
- ✅ 三栏布局设计器界面
- ✅ 拖拽功能支持
- ✅ 11 个 P0 基础组件全部实现

## 已实现功能

### 1. 设计器界面
- **组件库面板**（左侧）：展示可用的表单组件，支持拖拽
- **画布区域**（中间）：拖放和编辑组件
- **属性配置面板**（右侧）：实时编辑组件属性

### 2. P0 基础组件（11个）
1. **输入框 (Input)** - 文本输入
2. **数字输入框 (InputNumber)** - 数字输入，支持步进、最小最大值
3. **文本域 (Textarea)** - 多行文本输入
4. **下拉选择 (Select)** - 单选/多选下拉框
5. **单选框组 (RadioGroup)** - 单选按钮组
6. **复选框组 (CheckboxGroup)** - 多选复选框组
7. **日期选择器 (DatePicker)** - 日期/日期范围选择
8. **时间选择器 (TimePicker)** - 时间选择
9. **开关 (Switch)** - 开关切换
10. **滑块 (Slider)** - 数值滑动选择
11. **文件上传 (Upload)** - 文件上传

### 3. 核心功能
- 从组件库拖拽组件到画布
- 点击组件库添加组件到画布
- 点击画布中的组件进行选择
- 在属性面板实时编辑组件属性
- 删除选中的组件
- 清空画布

## 快速开始

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

访问 http://localhost:3000/ 查看效果

### 构建生产版本
\`\`\`bash
npm run build
\`\`\`

## 使用说明

1. **添加组件**：
   - 方式1：从左侧组件库拖拽组件到画布中
   - 方式2：点击左侧组件库中的组件按钮
2. **选择组件**：点击画布中的组件，会显示蓝色选中边框
3. **编辑属性**：选中组件后，在右侧属性面板修改组件属性，画布会实时更新
4. **删除组件**：选中组件后，点击右上角的删除按钮
5. **清空画布**：点击画布顶部的"清空画布"按钮

## 项目结构

\`\`\`
src/
├── components/
│   ├── designer/          # 设计器组件
│   │   ├── DesignerLayout.vue    # 主布局
│   │   ├── ComponentLibrary.vue  # 组件库面板
│   │   ├── Canvas.vue            # 画布
│   │   ├── CanvasItem.vue        # 画布组件包装器
│   │   └── PropertyPanel.vue     # 属性面板
│   └── fields/            # 表单字段组件
│       ├── BaseField.vue         # 基础字段包装器
│       ├── InputField.vue        # 输入框组件
│       └── index.ts              # 组件注册
├── stores/                # Pinia 状态管理
│   ├── designer.ts               # 设计器状态
│   └── componentRegistry.ts      # 组件注册表
├── types/                 # TypeScript 类型定义
│   ├── component.ts
│   ├── designer.ts
│   └── index.ts
├── utils/                 # 工具函数
│   ├── idGenerator.ts            # ID 生成器
│   └── defaultProps.ts           # 默认属性
├── App.vue                # 根组件
└── main.ts                # 应用入口
\`\`\`

## 技术栈

- **Vue 3.4.21** - 渐进式 JavaScript 框架
- **TypeScript 5.3.3** - JavaScript 的超集
- **Vite 5.1.4** - 下一代前端构建工具
- **Element Plus 2.5.6** - Vue 3 组件库
- **Pinia 2.1.7** - Vue 状态管理库

## 后续计划

- [ ] 动态属性面板（根据不同组件类型显示不同的属性配置）
- [ ] 组件定位和布局系统
- [ ] JSON Schema 导出
- [ ] Vue 代码生成
- [ ] 表单预览模式
- [ ] 验证规则配置
- [ ] 撤销/重做功能
- [ ] P1 布局组件（栅格、分组、标签页等）

## 开发说明

本项目是根据 [info.md](./info.md) 需求文档实现的 MVP 版本，专注于核心功能和架构搭建。

## License

MIT
