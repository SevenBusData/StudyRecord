# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

本项目是一个个人/中小型博客系统，基于 React + TypeScript + Vite 技术栈开发，采用 Tailwind CSS 和 ShadCN UI 组件库构建，具有简洁高级的设计风格。

## 开发环境配置

**注意**：本项目目前处于规划阶段，实际代码可能需要根据《Blog系统需求设计文档.md》进行开发。

## 技术架构

### 前端技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS 4.x
- **UI组件库**: ShadCN UI
- **路由**: React Router DOM 7.x
- **Markdown解析**: React Markdown + remark-gfm
- **图标**: Lucide React

### 项目结构

项目将采用以下架构（根据需求文档设计）：

```
src/
├── components/          # 通用组件
│   ├── ui/             # ShadCN UI 组件
│   ├── Navbar.tsx      # 导航栏
│   ├── BlogCard.tsx    # 博客卡片
│   └── ...
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── PostPage.tsx    # 文章详情页
│   ├── CategoriesPage.tsx  # 分类页
│   ├── TagsPage.tsx    # 标签页
│   └── ...
├── context/            # React 上下文
├── lib/                # 工具函数
├── data/               # 数据文件
├── types/              # TypeScript 类型定义
└── main.tsx            # 应用入口
```

### 核心功能模块

1. **首页**: 文章列表展示、分类导航、标签云、搜索功能
2. **文章详情页**: 文章内容展示、评论区、相关文章推荐
3. **分类/标签页**: 按分类/标签筛选文章
4. **搜索功能**: 文章搜索（支持标题、内容、标签）
5. **管理员后台**: 文章管理、分类/标签管理、评论管理、数据统计

## 开发命令

**注意**：以下命令是基于典型的 React + Vite 项目结构设计的，实际项目中可能需要调整。

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行 ESLint 检查
npm run lint

# 预览生产构建结果
npm run preview

# 部署到 GitHub Pages（需要配置）
npm run deploy
```

## 部署说明

项目可部署到 GitHub Pages 或其他静态网站托管服务。部署前需要确保：
1. 配置正确的 `homepage` 字段（在 package.json 中）
2. 确保 build 命令能正常工作
3. 配置 GitHub Pages 部署分支（通常为 gh-pages）

## 需求文档

详细的功能需求和设计规范请参考 `Blog系统需求设计文档.md` 文件。