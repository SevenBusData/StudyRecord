```
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
```

## 项目概述
这是一个博客系统的前端项目，基于 React + TypeScript + Vite 开发，使用 Tailwind CSS 作为样式框架，提供了用户认证、文章管理、分类管理、标签管理、评论管理和数据统计等功能。

## 常用命令

### 开发
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run lint     # 运行 ESLint 检查
npm run preview  # 预览生产构建
```

### 项目结构
```
src/
├── api/              # API 接口封装
├── components/       # 组件目录
│   ├── common/       # 公共组件
│   ├── admin/        # 管理员组件
│   └── ui/           # UI 组件（使用 shadcn/ui）
├── contexts/         # React 上下文
├── hooks/            # 自定义 Hooks
├── pages/            # 页面组件
│   ├── public/       # 公共页面
│   └── admin/        # 管理员页面
├── routes/           # 路由配置
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

## 技术栈
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Router DOM** - 路由管理
- **TanStack Query** - 数据状态管理
- **Axios** - HTTP 客户端
- **Lucide React** - 图标库
- **recharts** - 图表库
- **shadcn/ui** - UI 组件库

## 开发指南

### API 接口
所有 API 接口都定义在 `src/api/index.ts` 文件中，使用 Axios 进行 HTTP 请求。

### 路由保护
管理员路由使用 `ProtectedRoute` 组件进行保护，只有已认证用户才能访问。

### 数据状态管理
使用 TanStack Query 管理服务器状态，自定义 Hooks 位于 `src/hooks/` 目录下。

### 样式
使用 Tailwind CSS 进行样式开发，避免直接编写 CSS 代码。

### 组件开发
- 公共组件放在 `src/components/common/` 目录
- 管理员组件放在 `src/components/admin/` 目录
- UI 组件使用 shadcn/ui，位于 `src/components/ui/` 目录
