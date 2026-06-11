# lodash-es 迁移至 peerDependency 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 lodash-es 从 dependencies 移入 peerDependencies，删除无用的 dotenv/rimraf/uuid 依赖，Vite 构建 external lodash-es。

**Architecture:** 3 个文件变更，零源码改动。package.json 调整依赖分类，vite.config.ts 增加 external 配置，pnpm install 刷新 lock 文件。

**Tech Stack:** pnpm, Vite

---

### Task 1: 调整 package.json 依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 修改 dependencies / devDependencies / 新增 peerDependencies**

将 `dependencies` 块替换为空对象，新增 `peerDependencies`，在 `devDependencies` 中补充 `lodash-es`：

```diff
  "dependencies": {
-   "dotenv": "^16.4.7",
-   "lodash-es": "^4.17.21",
-   "rimraf": "^6.0.1",
-   "uuid": "^11.1.0"
+ },
+ "peerDependencies": {
+   "lodash-es": "^4.0.0"
  },
  "devDependencies": {
    "@types/lodash-es": "^4.17.12",
    "husky": "^9.1.7",
    "jsdom": "^26.0.0",
    "lint-staged": "^15.4.3",
+   "lodash-es": "^4.17.21",
    "prettier": "^3.5.2",
    "vite": "^6.2.0",
    "vite-plugin-dts": "^4.5.1",
    "vitest": "^3.0.7"
  },
```

- [ ] **Step 2: 运行 `pnpm install` 更新 lock 文件**

```bash
pnpm install
```

预期：`pnpm-lock.yaml` 更新，lodash-es 移至 devDependencies，dotenv/rimraf/uuid 被移除。

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: 将 lodash-es 移至 peerDependencies，删除无用依赖

- lodash-es 从 dependencies → peerDependencies + devDependencies
- 删除零引用依赖 dotenv、rimraf、uuid

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Vite 构建 external lodash-es

**Files:**
- Modify: `vite.config.ts:48-61`

- [ ] **Step 1: 在 rollupOptions 中增加 external**

```diff
      rollupOptions: {
+       external: ['lodash-es'],
        output: [
          {
            entryFileNames: fmtEntryFileNames(FORMAT_TYPE.es, name),
            format: FORMAT_TYPE.es,
            manualChunks: (id: string) => manualChunks(FORMAT_TYPE.es, id),
          },
          {
            entryFileNames: fmtEntryFileNames(FORMAT_TYPE.cjs, name),
            format: FORMAT_TYPE.cjs,
            manualChunks: (id: string) => manualChunks(FORMAT_TYPE.cjs, id),
          },
        ],
      },
```

- [ ] **Step 2: 验证构建产物不含 lodash-es 代码**

```bash
pnpm build && grep -c "lodash" dist/es/ztool.min.js || echo "lodash NOT bundled — OK"
```

预期：输出 `lodash NOT bundled — OK`（构建产物中不再内联 lodash 源码）。

- [ ] **Step 3: Commit**

```bash
git add vite.config.ts
git commit -m "chore: Vite 构建 external lodash-es，不打包进 dist

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: 验证测试仍然通过

- [ ] **Step 1: 运行完整测试**

```bash
pnpm test
```

预期：全部测试通过（lodash-es 仍在 devDependencies 中，测试运行时可用）。

- [ ] **Step 2: Commit（如有测试相关遗漏修复）**

如果测试失败，修复后提交；如果直接通过，无需额外提交。

---

### Task 4: 推送验证

- [ ] **Step 1: 推送至远程**

```bash
git push origin develop
```
