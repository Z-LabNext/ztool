# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目简介

`@zlabnext/ztool` — 前端工具库，核心功能是**表格单元格合并引擎**（CellMerger），附带常用工具函数（文件下载、颜色转换、URL 解析等）。

- 包管理器：**pnpm**（Node >= 22，见 `package.json` 的 `volta` 配置）
- 测试框架：**Vitest**
- 语言：TypeScript（strict），编译目标 ES6

## 常用命令

```bash
pnpm build          # Vite 构建，输出 dist/es/ (ESM) 和 dist/cjs/ (CJS)
pnpm test           # 运行 Vitest 全部测试
pnpm prettier       # 格式化全部代码
```

## 架构概览

```
src/main.ts                  # 入口，re-export merger 和 tools
├── external/merger/          # 核心：表格单元格合并引擎
│   ├── merger.ts             # CellMerger 类 — 行列合并计算
│   ├── index.ts              # 导出 CellMerger + Mode 枚举 + constants
│   ├── helpers/              # 校验/辅助函数
│   ├── constants/            # MERGE_OPTS_KEY、SORT_NO_KEY、ROW_KEY
│   └── types/                # 类型定义 + Mode 枚举
├── external/api/merger.ts    # 高层 API：getMergedData、splitIntoFragments、getFieldSpan、getSortNo
└── external/tools/           # 工具函数集
    ├── file/                 # downloadFileV2、convert2Webp
    ├── url/                  # getFilenameFromUrl、getFilenameFromDisposition
    ├── color/                # 颜色格式转换
    ├── option/               # 选项数据处理
    ├── params/               # URL 参数处理
    ├── string/               # 字符串工具
    ├── table/                # 表格行列号转换
    ├── errorTrap/            # 错误捕获
    └── array/                # JSON ↔ 数组互转
```

## 关键设计

- **CellMerger** 通过 `mergeCells()`（行合并）和 `mergeCols()`（列合并）在数据源上写入 `__merge_opts` 属性（rowspan/colspan），供表格组件直接读取。Mode 枚举有三值：`Row`、`Col`、`RowCol`（已废弃）。
- **API 层**（`src/external/api/merger.ts`）是对 CellMerger 的封装，额外提供 `splitIntoFragments`（分页合并）和 `getFieldSpan`/`getSortNo` 等便捷方法。
- 所有工具函数通过 `src/external/tools/index.ts` barrel 导出，外部使用方从 `@zlabnext/ztool` 直接引用。
- Vite 构建为库模式，双格式输出：`dist/es/ztool.min.js`（ESM）和 `dist/cjs/ztool.min.js`（CJS），类型声明输出到 `dist/types/`。
- `@/` 路径别名映射到 `src/`。
- 测试文件放在 `test/external/` 目录，文件名与源文件对应（如 `test/external/merger/cellMerger.test.ts` 对应 `src/external/merger/merger.ts`）。

## CI / 发布

- **Husky pre-commit**：运行 `lint-staged`（`prettier --write --ignore-unknown`）
- **GitHub Actions**：推送 `v*` 标签触发 `publish.yml`，执行 `pnpm install → build → test → publish`
