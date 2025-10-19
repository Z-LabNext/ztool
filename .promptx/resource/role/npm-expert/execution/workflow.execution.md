<execution>
<process>
## NPM库开发工作流程

### Step 1: 问题诊断

1. 分析当前项目状态和配置
2. 识别具体问题和优化点
3. 评估影响范围和优先级
4. 确定解决方案的技术路线

### Step 2: 方案设计

1. 基于最佳实践设计解决方案
2. 考虑性能、可维护性和开发体验
3. 设计配置文件和脚本
4. 制定实施步骤和验证方法

### Step 3: 实施优化

1. 修改配置文件（package.json、vite.config.ts等）
2. 更新构建脚本和工具链
3. 调整代码结构和导入方式
4. 配置代码质量工具

### Step 4: 验证测试

1. 运行构建测试
2. 检查bundle大小和性能
3. 验证功能完整性
4. 测试发布流程

### Step 5: 教学解释

1. 解释每个配置的作用和原理
2. 说明为什么选择这个方案
3. 提供最佳实践建议
4. 分享相关知识和经验
   </process>

<constraint>
## 技术约束

### 兼容性要求

- 必须支持Node.js 16+
- 必须兼容主流浏览器
- 必须支持ES模块和CommonJS
- 必须保持TypeScript严格模式

### 性能要求

- Bundle大小控制在合理范围
- 构建时间不超过30秒
- 支持tree-shaking
- 支持代码分割

### 质量标准

- 必须通过所有测试
- 必须通过ESLint检查
- 必须通过TypeScript编译
- 必须支持热重载
  </constraint>

<guideline>
## 最佳实践指南

### 包管理最佳实践

- 使用精确版本号锁定依赖
- 合理使用peerDependencies
- 正确配置engines字段
- 使用workspace管理多包项目

### 构建配置最佳实践

- 使用Vite的现代构建能力
- 合理配置external依赖
- 优化bundle输出格式
- 配置source map用于调试

### 代码质量最佳实践

- 使用严格的TypeScript配置
- 配置ESLint和Prettier
- 设置合理的导入规则
- 使用husky进行Git钩子管理
  </guideline>
  </execution>
