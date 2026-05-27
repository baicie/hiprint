# Reverse hiprint

反编译工具，用于从压缩混淆的 hiprint bundle 中提取可读的模块代码。

## 使用方法

```bash
# 安装依赖
pnpm install

# 执行全部反编译步骤
pnpm run all

# 或分步执行
pnpm run beautify      # 1. 格式化代码
pnpm run extract-webpack   # 2. 提取 webpack 模块
pnpm run extract-browserify # 3. 提取 browserify 模块
pnpm run clean         # 4. 清洗变量名
pnpm run scan-api      # 5. 扫描 API
pnpm run clean-config  # 6. 清洗配置文件
pnpm run scan-deps     # 7. 扫描模块依赖
```

## 目录结构

```
output/
├── pretty/                    # 格式化后的原始文件
│   ├── hiprint.bundle.js
│   ├── hiprint.config.js
│   └── polyfill.min.js
│
├── modules/                   # 拆分的模块
│   ├── hiprint/             # webpack 模块 (34个)
│   │   ├── module-000.js
│   │   ├── module-001.js
│   │   └── ...
│   └── polyfill/            # browserify 模块 (307个)
│       ├── manifest.json
│       └── module-*.js
│
├── cleaned/                   # 清洗后的代码
│   ├── hiprint/
│   └── hiprint.config.js
│
└── report/                   # 分析报告
    ├── api-report.json       # API/类/方法扫描
    └── webpack-deps.json     # 模块依赖图
```

## 关键模块映射 (基于 manifest)

| 模块 ID | 文件大小 | 关键内容 |
|---------|----------|----------|
| 0 | 6.9KB | `window.hinnn` - 工具库 |
| 2 | 3.6KB | `HiPrint` - 核心实例 |
| 4 | 22.9KB | `BasePrintElement` - 基础元素类 |
| 5 | 9.4KB | 表格单元格相关 |
| 9 | 124KB | 元素选项构建器 |
| 13 | 2.5KB | `TableCell` |
| 15 | 22.3KB | `TablePrintElement` - 表格元素 |
| 16 | 27.8KB | 表格设计器 |
| 26 | 2.2KB | `window.hiwebSocket` |
| 33 | 124KB | `PrintTemplate`/`PrintPanel` - 模板/面板核心 |

## 下一步

1. 阅读 `output/report/api-report.json` 了解 API 结构
2. 查看 `output/report/webpack-deps.json` 了解模块依赖关系
3. 从关键模块开始手动重构命名
4. 建议优先级: module-033 > module-004 > module-015 > module-009

## License

注意：hiprint 源码使用 LGPL 或商业许可证，详见原始 bundle 文件头。
