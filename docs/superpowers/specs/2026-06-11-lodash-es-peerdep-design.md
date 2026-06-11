# 剔除 lodash-es 直接依赖，改为 peerDependency

**日期**: 2026-06-11  
**状态**: 已批准

## 目标

将 `lodash-es` 从 `dependencies` 移入 `peerDependencies`，同时删除无用的直接依赖（`dotenv`、`rimraf`、`uuid`）。源码不做任何改动。

## 改动清单

### 1. `package.json`

- `dependencies`：移除 `lodash-es`、`dotenv`、`rimraf`、`uuid`（`dependencies` 变为空对象）
- `peerDependencies`：新增 `"lodash-es": "^4.0.0"`
- `devDependencies`：新增 `"lodash-es": "^4.17.21"`（本地开发和测试需要）

`@types/lodash-es` 保留不动。

### 2. `vite.config.ts`

在 `rollupOptions.output[].external` 中增加 `'lodash-es'`，使 Vite 构建时不将 lodash-es 打包进 dist。

### 3. 源码

**不做任何改动。** 所有 `from 'lodash-es'` 导入保持原样。

## 预期效果

- ztool 包体积显著减小（不再内置 lodash-es）
- 消费方项目自行提供 `lodash-es`（或通过打包器 alias `lodash → lodash-es` 兼容 `lodash`）
- 移除 3 个零引用依赖，`node_modules` 更轻量

## 不涉及

- 不修改任何测试文件
- 不修改构建产物结构
- 不修改 CI/CD 流程
