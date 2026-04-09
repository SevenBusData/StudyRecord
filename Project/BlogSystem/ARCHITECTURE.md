# Blog 系统架构设计与实现方案

## 项目概述

这是一个个人/中小型博客系统，采用前后端分离架构：
- **前端**：React + TypeScript + Vite + ShadCN UI + Tailwind CSS
- **后端**：Java SpringBoot + MySQL + MyBatis-Plus
- **设计风格**：简洁高级、响应式设计
- **双角色**：游客（仅浏览）和管理员（本人，所有权限）

## 一、前端架构设计

### 1. 项目结构

```
blog-frontend/
├── src/
│   ├── main.tsx                 # 应用入口
│   ├── App.tsx                  # 根组件
│   ├── index.css                # 全局样式
│   ├── vite-env.d.ts            # Vite 环境类型定义
│   ├── api/                     # API 接口模块
│   │   ├── index.ts             # API 实例配置
│   │   ├── articles.ts          # 文章相关接口
│   │   ├── categories.ts        # 分类相关接口
│   │   ├── tags.ts              # 标签相关接口
│   │   ├── comments.ts          # 评论相关接口
│   │   ├── auth.ts              # 认证相关接口
│   │   └── stats.ts             # 统计相关接口
│   ├── components/              # 公共组件
│   │   ├── ui/                  # ShadCN UI 组件
│   │   ├── common/              # 通用组件
│   │   │   ├── Header.tsx       # 头部组件
│   │   │   ├── Footer.tsx       # 底部组件
│   │   │   ├── ArticleCard.tsx  # 文章卡片
│   │   │   ├── TagCloud.tsx     # 标签云
│   │   │   └── SearchBar.tsx    # 搜索栏
│   │   └── admin/               # 管理员专属组件
│   │       ├── Sidebar.tsx      # 侧边栏
│   │       ├── Dashboard.tsx    # 仪表盘
│   │       └── StatCard.tsx     # 统计卡片
│   ├── hooks/                   # 自定义钩子
│   │   ├── useAuth.ts           # 认证钩子
│   │   ├── useArticles.ts       # 文章管理钩子
│   │   ├── useComments.ts       # 评论管理钩子
│   │   └── useStats.ts          # 统计钩子
│   ├── pages/                   # 页面组件
│   │   ├── Home.tsx             # 首页
│   │   ├── ArticleDetail.tsx    # 文章详情页
│   │   ├── Category.tsx         # 分类页
│   │   ├── Tag.tsx              # 标签页
│   │   ├── Search.tsx           # 搜索结果页
│   │   ├── About.tsx            # 关于页
│   │   ├── Login.tsx            # 登录页
│   │   ├── Register.tsx         # 注册页
│   │   └── admin/               # 管理员页面
│   │       ├── ArticleManage.tsx    # 文章管理
│   │       ├── CategoryManage.tsx  # 分类管理
│   │       ├── TagManage.tsx       # 标签管理
│   │       ├── CommentManage.tsx   # 评论管理
│   │       ├── Profile.tsx         # 个人中心
│   │       ├── Settings.tsx        # 系统设置
│   │       └── Editor.tsx          # 编辑器
│   ├── stores/                  # 状态管理
│   │   ├── useAuthStore.ts      # 认证状态
│   │   ├── useArticleStore.ts   # 文章状态
│   │   └── useSettingStore.ts   # 设置状态
│   ├── types/                   # 类型定义
│   │   ├── index.ts             # 通用类型
│   │   ├── article.ts           # 文章类型
│   │   ├── category.ts          # 分类类型
│   │   ├── tag.ts               # 标签类型
│   │   ├── comment.ts           # 评论类型
│   │   └── user.ts              # 用户类型
│   ├── utils/                   # 工具函数
│   │   ├── storage.ts           # 存储工具
│   │   ├── format.ts            # 格式化工具
│   │   ├── validator.ts         # 验证工具
│   │   └── helper.ts            # 辅助工具
│   └── assets/                  # 静态资源
│       ├── images/              # 图片资源
│       └── styles/              # 样式文件
├── public/                      # 公共资源
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 配置
└── tailwind.config.js           # Tailwind CSS 配置
```

### 2. 组件划分

#### 公共组件
- **Header**：顶部导航栏，包含 logo、导航菜单、搜索框、登录/个人中心入口
- **Footer**：底部信息栏，包含版权信息、联系方式
- **ArticleCard**：文章卡片组件，展示文章基本信息
- **TagCloud**：标签云组件，支持标签点击跳转
- **SearchBar**：搜索栏组件，支持实时搜索

#### 管理员组件
- **Sidebar**：管理后台侧边栏，包含导航菜单
- **Dashboard**：仪表盘组件，展示核心数据统计
- **StatCard**：统计卡片组件，展示单指标数据

#### 页面组件
- **Home**：首页，展示最新文章、热门文章、分类、标签云
- **ArticleDetail**：文章详情页，展示完整内容、评论、相关推荐
- **Category**：分类页，展示分类列表及该分类下的文章
- **Tag**：标签页，展示标签云及该标签下的文章
- **Search**：搜索结果页，展示搜索匹配的文章
- **About**：关于页，展示博主信息、联系方式
- **Login/Register**：登录/注册页面
- **Admin Pages**：管理员页面（文章管理、分类管理、标签管理、评论管理、个人中心、系统设置、编辑器）

### 3. 路由设计

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import ArticleDetail from '@/pages/ArticleDetail';
import Category from '@/pages/Category';
import Tag from '@/pages/Tag';
import Search from '@/pages/Search';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ArticleManage from '@/pages/admin/ArticleManage';
import CategoryManage from '@/pages/admin/CategoryManage';
import TagManage from '@/pages/admin/TagManage';
import CommentManage from '@/pages/admin/CommentManage';
import Profile from '@/pages/admin/Profile';
import Settings from '@/pages/admin/Settings';
import Editor from '@/pages/admin/Editor';
import Dashboard from '@/components/admin/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/article/:id',
    element: <ArticleDetail />,
  },
  {
    path: '/category/:id',
    element: <Category />,
  },
  {
    path: '/tag/:id',
    element: <Tag />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'articles',
        element: <ArticleManage />,
      },
      {
        path: 'articles/edit/:id',
        element: <Editor />,
      },
      {
        path: 'articles/new',
        element: <Editor />,
      },
      {
        path: 'categories',
        element: <CategoryManage />,
      },
      {
        path: 'tags',
        element: <TagManage />,
      },
      {
        path: 'comments',
        element: <CommentManage />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
```

## 二、后端架构设计

### 1. 项目结构

```
blog-backend/
├── src/
│   ├── main/
│   │   ├── java/com/blog/
│   │   │   ├── BlogApplication.java       # 应用主类
│   │   │   ├── config/                    # 配置类
│   │   │   │   ├── CorsConfig.java        # 跨域配置
│   │   │   │   ├── MyBatisPlusConfig.java # MyBatis-Plus 配置
│   │   │   │   ├── RedisConfig.java       # Redis 配置（可选）
│   │   │   │   └── SecurityConfig.java    # 安全配置
│   │   │   ├── controller/                # 控制层
│   │   │   │   ├── ArticleController.java    # 文章接口
│   │   │   │   ├── CategoryController.java  # 分类接口
│   │   │   │   ├── TagController.java       # 标签接口
│   │   │   │   ├── CommentController.java   # 评论接口
│   │   │   │   ├── AuthController.java      # 认证接口
│   │   │   │   ├── StatsController.java     # 统计接口
│   │   │   │   └── UploadController.java    # 文件上传接口
│   │   │   ├── entity/                    # 实体类
│   │   │   │   ├── Article.java           # 文章实体
│   │   │   │   ├── Category.java          # 分类实体
│   │   │   │   ├── Tag.java               # 标签实体
│   │   │   │   ├── Comment.java           # 评论实体
│   │   │   │   ├── User.java              # 用户实体
│   │   │   │   └── ArticleTag.java        # 文章标签关联
│   │   │   ├── dto/                       # 数据传输对象
│   │   │   │   ├── ArticleDTO.java        # 文章 DTO
│   │   │   │   ├── CommentDTO.java        # 评论 DTO
│   │   │   │   ├── LoginDTO.java          # 登录 DTO
│   │   │   │   └── RegisterDTO.java       # 注册 DTO
│   │   │   ├── vo/                        # 值对象
│   │   │   │   ├── ArticleVO.java         # 文章 VO
│   │   │   │   ├── CategoryVO.java        # 分类 VO
│   │   │   │   ├── TagVO.java             # 标签 VO
│   │   │   │   ├── CommentVO.java         # 评论 VO
│   │   │   │   └── StatVO.java            # 统计 VO
│   │   │   ├── mapper/                    # 数据访问层
│   │   │   │   ├── ArticleMapper.java
│   │   │   │   ├── CategoryMapper.java
│   │   │   │   ├── TagMapper.java
│   │   │   │   ├── CommentMapper.java
│   │   │   │   └── UserMapper.java
│   │   │   ├── service/                   # 业务层
│   │   │   │   ├── ArticleService.java
│   │   │   │   ├── CategoryService.java
│   │   │   │   ├── TagService.java
│   │   │   │   ├── CommentService.java
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── StatsService.java
│   │   │   │   └── impl/                 # 业务层实现
│   │   │   ├── utils/                     # 工具类
│   │   │   │   ├── JwtUtil.java           # JWT 工具
│   │   │   │   ├── PasswordUtil.java      # 密码工具
│   │   │   │   ├── FileUtil.java          # 文件工具
│   │   │   │   └── ResponseUtil.java      # 响应工具
│   │   │   └── common/                    # 公共类
│   │   │       ├── Result.java            # 统一响应结果
│   │   │       └── PageResult.java        # 分页结果
│   │   └── resources/
│   │       ├── application.yml            # 应用配置
│   │       ├── application-dev.yml        # 开发环境配置
│   │       ├── application-prod.yml       # 生产环境配置
│   │       ├── mapper/                    # MyBatis 映射文件
│   │       └── static/                   # 静态资源
│   └── test/                              # 测试类
├── pom.xml                                # Maven 配置
└── README.md                              # 项目说明
```

### 2. API 设计

#### 认证接口
```java
// 登录
@PostMapping("/auth/login")
public Result<LoginDTO> login(@RequestBody LoginDTO loginDTO)

// 注册
@PostMapping("/auth/register")
public Result<User> register(@RequestBody RegisterDTO registerDTO)

// 登出
@PostMapping("/auth/logout")
public Result<Void> logout(@RequestHeader("Authorization") String token)

// 获取当前用户信息
@GetMapping("/auth/me")
public Result<User> getCurrentUser(@RequestHeader("Authorization") String token)
```

#### 文章接口
```java
// 获取文章列表（分页）
@GetMapping("/articles")
public Result<PageResult<ArticleVO>> getArticles(
    @RequestParam(defaultValue = "1") Integer page,
    @RequestParam(defaultValue = "10") Integer size)

// 获取文章详情
@GetMapping("/articles/{id}")
public Result<ArticleVO> getArticleById(@PathVariable Long id)

// 新增文章（管理员）
@PostMapping("/articles")
public Result<Void> createArticle(@RequestBody ArticleDTO articleDTO,
                                  @RequestHeader("Authorization") String token)

// 更新文章（管理员）
@PutMapping("/articles/{id}")
public Result<Void> updateArticle(@PathVariable Long id,
                                  @RequestBody ArticleDTO articleDTO,
                                  @RequestHeader("Authorization") String token)

// 删除文章（管理员）
@DeleteMapping("/articles/{id}")
public Result<Void> deleteArticle(@PathVariable Long id,
                                  @RequestHeader("Authorization") String token)

// 搜索文章
@GetMapping("/articles/search")
public Result<PageResult<ArticleVO>> searchArticles(
    @RequestParam String keyword,
    @RequestParam(defaultValue = "1") Integer page,
    @RequestParam(defaultValue = "10") Integer size)
```

#### 分类接口
```java
// 获取分类列表
@GetMapping("/categories")
public Result<List<CategoryVO>> getCategories()

// 获取分类详情
@GetMapping("/categories/{id}")
public Result<CategoryVO> getCategoryById(@PathVariable Long id)

// 获取分类下的文章（分页）
@GetMapping("/categories/{id}/articles")
public Result<PageResult<ArticleVO>> getArticlesByCategory(
    @PathVariable Long id,
    @RequestParam(defaultValue = "1") Integer page,
    @RequestParam(defaultValue = "10") Integer size)

// 新增分类（管理员）
@PostMapping("/categories")
public Result<Void> createCategory(@RequestBody Category category,
                                    @RequestHeader("Authorization") String token)

// 更新分类（管理员）
@PutMapping("/categories/{id}")
public Result<Void> updateCategory(@PathVariable Long id,
                                    @RequestBody Category category,
                                    @RequestHeader("Authorization") String token)

// 删除分类（管理员）
@DeleteMapping("/categories/{id}")
public Result<Void> deleteCategory(@PathVariable Long id,
                                    @RequestHeader("Authorization") String token)
```

#### 标签接口
```java
// 获取标签列表
@GetMapping("/tags")
public Result<List<TagVO>> getTags()

// 获取标签详情
@GetMapping("/tags/{id}")
public Result<TagVO> getTagById(@PathVariable Long id)

// 获取标签下的文章（分页）
@GetMapping("/tags/{id}/articles")
public Result<PageResult<ArticleVO>> getArticlesByTag(
    @PathVariable Long id,
    @RequestParam(defaultValue = "1") Integer page,
    @RequestParam(defaultValue = "10") Integer size)

// 新增标签（管理员）
@PostMapping("/tags")
public Result<Void> createTag(@RequestBody Tag tag,
                               @RequestHeader("Authorization") String token)

// 更新标签（管理员）
@PutMapping("/tags/{id}")
public Result<Void> updateTag(@PathVariable Long id,
                               @RequestBody Tag tag,
                               @RequestHeader("Authorization") String token)

// 删除标签（管理员）
@DeleteMapping("/tags/{id}")
public Result<Void> deleteTag(@PathVariable Long id,
                               @RequestHeader("Authorization") String token)
```

#### 评论接口
```java
// 获取文章评论
@GetMapping("/articles/{id}/comments")
public Result<List<CommentVO>> getCommentsByArticle(@PathVariable Long id)

// 新增评论（管理员）
@PostMapping("/comments")
public Result<Void> createComment(@RequestBody CommentDTO commentDTO,
                                   @RequestHeader("Authorization") String token)

// 删除评论（管理员）
@DeleteMapping("/comments/{id}")
public Result<Void> deleteComment(@PathVariable Long id,
                                   @RequestHeader("Authorization") String token)
```

#### 统计接口
```java
// 获取博客统计数据
@GetMapping("/stats")
public Result<StatVO> getBlogStats()

// 获取文章阅读趋势
@GetMapping("/stats/article/trend")
public Result<List<Map<String, Object>>> getArticleTrend(
    @RequestParam String startDate,
    @RequestParam String endDate)

// 获取热门文章
@GetMapping("/stats/article/popular")
public Result<List<ArticleVO>> getPopularArticles(
    @RequestParam(defaultValue = "10") Integer limit)
```

### 3. 数据库设计

#### 用户表 (tb_user)
```sql
CREATE TABLE `tb_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `description` text COMMENT '个人描述',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

#### 文章表 (tb_article)
```sql
CREATE TABLE `tb_article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(200) NOT NULL COMMENT '文章标题',
  `content` longtext NOT NULL COMMENT '文章内容',
  `summary` varchar(500) DEFAULT NULL COMMENT '文章摘要',
  `cover_image` varchar(200) DEFAULT NULL COMMENT '封面图片',
  `view_count` int(11) DEFAULT 0 COMMENT '阅读量',
  `comment_count` int(11) DEFAULT 0 COMMENT '评论数',
  `like_count` int(11) DEFAULT 0 COMMENT '点赞数',
  `status` tinyint(4) DEFAULT 0 COMMENT '状态：0-草稿，1-已发布',
  `category_id` bigint(20) DEFAULT NULL COMMENT '分类ID',
  `user_id` bigint(20) NOT NULL COMMENT '作者ID',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';
```

#### 分类表 (tb_category)
```sql
CREATE TABLE `tb_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `description` varchar(200) DEFAULT NULL COMMENT '分类描述',
  `sort_order` int(11) DEFAULT 0 COMMENT '排序',
  `article_count` int(11) DEFAULT 0 COMMENT '文章数量',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分类表';
```

#### 标签表 (tb_tag)
```sql
CREATE TABLE `tb_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `name` varchar(50) NOT NULL COMMENT '标签名称',
  `article_count` int(11) DEFAULT 0 COMMENT '文章数量',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签表';
```

#### 文章标签关联表 (tb_article_tag)
```sql
CREATE TABLE `tb_article_tag` (
  `article_id` bigint(20) NOT NULL COMMENT '文章ID',
  `tag_id` bigint(20) NOT NULL COMMENT '标签ID',
  PRIMARY KEY (`article_id`, `tag_id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章标签关联表';
```

#### 评论表 (tb_comment)
```sql
CREATE TABLE `tb_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `content` varchar(500) NOT NULL COMMENT '评论内容',
  `article_id` bigint(20) NOT NULL COMMENT '文章ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父评论ID',
  `reply_to` bigint(20) DEFAULT NULL COMMENT '回复目标用户ID',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_parent_id` (`parent_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';
```

## 三、技术栈选择建议

### 前端技术栈
- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **UI组件库**：ShadCN UI（简洁高级风格）
- **样式**：Tailwind CSS v4
- **路由**：React Router v6
- **状态管理**：Zustand（轻量级）
- **HTTP请求**：Axios
- **Markdown编辑器**：MDX + React-Markdown
- **图表**：Recharts
- **代码高亮**：Prism.js
- **图片处理**：React-Image
- **动画**：Framer Motion

### 后端技术栈
- **框架**：SpringBoot 3.2.x
- **ORM**：MyBatis-Plus 3.5.x
- **数据库**：MySQL 8.0
- **缓存**：Redis（可选，用于文章缓存）
- **认证授权**：JWT + Spring Security
- **文件存储**：本地存储（基础）/ 阿里云 OSS（扩展）
- **工具库**：
  - Lombok（简化代码）
  - Hutool（工具库）
  - Apache Commons（通用工具）
- **日志**：Slf4j + Logback
- **API文档**：Swagger/OpenAPI 3.0

### 部署建议
- **服务器**：阿里云/腾讯云轻量应用服务器（2核4G起）
- **容器化**：Docker + Docker Compose
- **反向代理**：Nginx
- **数据库**：MySQL（容器化部署）
- **CI/CD**：GitHub Actions（可选）

## 四、实现步骤规划

### 第一阶段：基础框架搭建（1-2周）

#### 后端开发
1. 搭建 SpringBoot 项目框架
2. 配置数据库、MyBatis-Plus、JWT 等基础组件
3. 创建实体类、Mapper、Service、Controller 层基础结构
4. 实现用户认证（登录/注册）功能
5. 配置 Swagger API 文档

#### 前端开发
1. 搭建 React + TypeScript + Vite 项目
2. 配置 ShadCN UI 和 Tailwind CSS
3. 创建基础组件和页面框架
4. 实现路由和状态管理
5. 集成 Axios 配置 API 请求

### 第二阶段：公共功能实现（2-3周）

#### 后端开发
1. 实现文章增删改查接口
2. 实现分类、标签管理接口
3. 实现评论管理接口
4. 实现文件上传接口
5. 实现搜索功能（基于关键词的简单搜索）

#### 前端开发
1. 实现首页（文章列表、分类、标签云）
2. 实现文章详情页（内容展示、评论、相关推荐）
3. 实现分类页和标签页
4. 实现搜索功能
5. 实现关于页

### 第三阶段：管理员功能实现（2-3周）

#### 后端开发
1. 实现文章管理接口（包括草稿、回收站）
2. 实现统计接口（文章、阅读、评论等）
3. 实现系统设置接口
4. 完善权限控制和安全机制

#### 前端开发
1. 实现登录/注册页面
2. 实现管理后台仪表盘
3. 实现文章管理页面
4. 实现分类、标签管理页面
5. 实现评论管理页面
6. 实现个人中心和系统设置页面

### 第四阶段：编辑器功能实现（1-2周）

#### 后端开发
1. 优化文章保存接口（支持自动保存）
2. 实现图片/视频上传接口
3. 实现草稿自动保存和恢复功能

#### 前端开发
1. 集成 Markdown 编辑器（支持表格、代码块）
2. 实现图片/代码插入功能
3. 实现自动保存功能
4. 实现预览功能

### 第五阶段：优化与测试（1-2周）

1. 优化页面加载速度（图片懒加载、代码分割）
2. 优化响应式设计（移动端适配）
3. 完善错误处理和用户提示
4. 编写单元测试和集成测试
5. 系统测试与优化

### 第六阶段：部署上线（1周）

1. 服务器环境准备
2. Docker 容器化部署
3. Nginx 配置
4. 域名解析和 SSL 证书
5. 系统监控和日志配置

## 五、重点功能的实现方案

### 1. 编辑器功能实现

**技术选型**：React-Markdown + React-Markdown-Editor-Lite

**核心功能**：
- Markdown 编辑与预览
- 图片/代码插入
- 自动保存（定时本地存储）
- 草稿管理
- 代码高亮

**实现思路**：
```typescript
// 编辑器组件示例
import { useState, useEffect } from 'react';
import Editor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createArticle, updateArticle } from '@/api/articles';

interface EditorProps {
  articleId?: string;
}

const ArticleEditor: React.FC<EditorProps> = ({ articleId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [autoSaveId, setAutoSaveId] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // 自动保存功能
  useEffect(() => {
    const saveDraft = () => {
      if (title.trim() || content.trim()) {
        localStorage.setItem(`draft-${articleId}`, JSON.stringify({
          title,
          content,
          categoryId,
          tags,
          savedAt: new Date().toISOString()
        }));
      }
    };

    const id = setInterval(saveDraft, 30000);
    setAutoSaveId(id);
    return () => clearInterval(id);
  }, [title, content, categoryId, tags]);

  // 加载草稿
  useEffect(() => {
    const draft = localStorage.getItem(`draft-${articleId}`);
    if (draft) {
      const { title: savedTitle, content: savedContent, categoryId: savedCategory, tags: savedTags } = JSON.parse(draft);
      setTitle(savedTitle);
      setContent(savedContent);
      setCategoryId(savedCategory);
      setTags(savedTags);
    }
  }, [articleId]);

  // 保存文章
  const handleSave = async () => {
    const data = {
      title,
      content,
      categoryId: parseInt(categoryId),
      tags,
      status
    };

    try {
      if (articleId) {
        await updateArticle(parseInt(articleId), data);
      } else {
        await createArticle(data);
      }
      localStorage.removeItem(`draft-${articleId}`);
      navigate('/admin/articles');
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 工具栏 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/articles')}>
            返回
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setStatus('draft')}>
            保存草稿
          </Button>
          <Button variant="default" onClick={() => {
            setStatus('published');
            handleSave();
          }}>
            发布
          </Button>
        </div>
      </div>

      {/* 编辑区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧编辑区 */}
        <div className="flex-1 p-6 overflow-y-auto">
          <input
            type="text"
            placeholder="请输入文章标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold mb-4 border-b pb-2"
          />
          
          <div className="mb-4 flex gap-4">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {/* 分类选项 */}
            </select>
            <input
              type="text"
              placeholder="添加标签，用回车分隔"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const tag = e.target.value.trim();
                  if (tag && !tags.includes(tag)) {
                    setTags([...tags, tag]);
                    e.target.value = '';
                  }
                }
              }}
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>

          <Editor
            value={content}
            onChange={setContent}
            height="100%"
            visibleDragBar={false}
            preview="live"
          />
        </div>

        {/* 右侧预览区 */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* 预览内容 */}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
```

### 2. 搜索功能实现

**技术选型**：MySQL 全文索引 + 前端搜索高亮

**核心功能**：
- 关键词搜索（文章标题、内容、标签）
- 搜索结果分页
- 搜索关键词高亮
- 搜索建议（可选）

**实现思路**：

**后端实现**：
```java
// ArticleController.java
@GetMapping("/articles/search")
public Result<PageResult<ArticleVO>> searchArticles(
    @RequestParam String keyword,
    @RequestParam(defaultValue = "1") Integer page,
    @RequestParam(defaultValue = "10") Integer size) {
  // 使用 MyBatis-Plus 的 QueryWrapper 进行搜索
  QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
  queryWrapper.and(wrapper -> wrapper
      .like("title", keyword)
      .or()
      .like("content", keyword)
      .or()
      .inSql("id", "SELECT article_id FROM tb_article_tag WHERE tag_id IN (SELECT id FROM tb_tag WHERE name LIKE '%" + keyword + "%')")
  );
  
  queryWrapper.eq("status", 1); // 仅搜索已发布文章
  queryWrapper.orderByDesc("created_at");
  
  Page<Article> articlePage = articleService.page(new Page<>(page, size), queryWrapper);
  
  PageResult<ArticleVO> result = new PageResult<>();
  result.setRecords(articlePage.getRecords().stream().map(ArticleVO::new).collect(Collectors.toList()));
  result.setTotal(articlePage.getTotal());
  result.setPages(articlePage.getPages());
  result.setCurrent(articlePage.getCurrent());
  
  return Result.success(result);
}
```

**前端实现**：
```typescript
// Search.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from '@/components/common/ArticleCard';
import { searchArticles } from '@/api/articles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('q', keyword);
      setSearchParams(params);
      
      const response = await searchArticles(keyword, 1, 10);
      setArticles(response.data.records);
      setTotal(response.data.total);
      setPage(1);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await searchArticles(keyword, nextPage, 10);
      setArticles([...articles, ...response.data.records]);
      setPage(nextPage);
    } catch (error) {
      console.error('加载更多失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始搜索
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setKeyword(q);
      handleSearch();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* 搜索表单 */}
        <div className="mb-10 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="搜索文章..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? '搜索中...' : '搜索'}
            </Button>
          </form>
        </div>

        {/* 搜索结果 */}
        {keyword && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              搜索结果
              <span className="text-gray-500 ml-2">
                (共 {total} 篇文章)
              </span>
            </h1>
            <p className="text-gray-600">
              搜索关键词: <span className="font-semibold">{keyword}</span>
            </p>
          </div>
        )}

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              highlight={keyword}
            />
          ))}
        </div>

        {/* 加载更多 */}
        {articles.length < total && (
          <div className="mt-10 text-center">
            <Button onClick={handleLoadMore} disabled={loading}>
              {loading ? '加载中...' : '加载更多'}
            </Button>
          </div>
        )}

        {/* 无结果 */}
        {!loading && articles.length === 0 && keyword && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              未找到与 "{keyword}" 相关的文章
            </p>
            <p className="text-gray-400 mt-2">
              您可以尝试其他关键词
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
```

### 3. 数据统计功能实现

**技术选型**：Recharts + MyBatis-Plus 分组查询

**核心功能**：
- 核心数据统计（文章总数、阅读量、评论量、收藏量）
- 文章阅读趋势（日/周/月）
- 热门文章排行
- 数据可视化图表

**实现思路**：

**后端实现**：
```java
// StatsController.java
@GetMapping("/stats")
public Result<StatVO> getBlogStats() {
  StatVO statVO = new StatVO();
  
  // 获取文章总数（已发布）
  QueryWrapper<Article> articleWrapper = new QueryWrapper<>();
  articleWrapper.eq("status", 1);
  statVO.setArticleCount(articleService.count(articleWrapper));
  
  // 获取总阅读量
  statVO.setTotalViews(articleService.list(articleWrapper).stream()
      .mapToLong(Article::getViewCount)
      .sum());
  
  // 获取总评论数
  QueryWrapper<Comment> commentWrapper = new QueryWrapper<>();
  statVO.setTotalComments(commentService.count(commentWrapper));
  
  // 获取热门文章
  QueryWrapper<Article> popularWrapper = new QueryWrapper<>();
  popularWrapper.eq("status", 1);
  popularWrapper.orderByDesc("view_count");
  statVO.setPopularArticles(articleService.list(popularWrapper)
      .stream()
      .limit(10)
      .map(ArticleVO::new)
      .collect(Collectors.toList()));
  
  return Result.success(statVO);
}

@GetMapping("/stats/article/trend")
public Result<List<Map<String, Object>>> getArticleTrend(
    @RequestParam String startDate,
    @RequestParam String endDate) {
  // 获取文章发布趋势（按日期分组）
  QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
  queryWrapper.eq("status", 1);
  queryWrapper.between("created_at", startDate, endDate);
  
  return Result.success(articleService.getArticleTrend(queryWrapper));
}

// ArticleService.java
public List<Map<String, Object>> getArticleTrend(QueryWrapper<Article> queryWrapper) {
  return articleMapper.selectMaps(new QueryWrapper<Article>()
      .select("DATE_FORMAT(created_at, '%Y-%m-%d') as date", "COUNT(id) as count")
      .eq("status", 1)
      .between("created_at", queryWrapper.getParamNameValuePairs().get("startDate"), 
               queryWrapper.getParamNameValuePairs().get("endDate"))
      .groupBy("DATE_FORMAT(created_at, '%Y-%m-%d')")
      .orderByAsc("DATE_FORMAT(created_at, '%Y-%m-%d')"));
}
```

**前端实现**：
```typescript
// Dashboard.tsx
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { getBlogStats, getArticleTrend } from '@/api/stats';
import StatCard from '@/components/admin/StatCard';
import Sidebar from '@/components/admin/Sidebar';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取统计数据
        const statsResponse = await getBlogStats();
        setStats(statsResponse.data);

        // 获取文章趋势数据（最近30天）
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        const trendResponse = await getArticleTrend(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        );
        setTrendData(trendResponse.data);
      } catch (error) {
        console.error('获取统计数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">加载中...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* 核心数据统计 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="文章总数"
              value={stats.articleCount}
              icon="📚"
              trend="+12%"
            />
            <StatCard
              title="总阅读量"
              value={stats.totalViews}
              icon="👁️"
              trend="+8%"
            />
            <StatCard
              title="总评论数"
              value={stats.totalComments}
              icon="💬"
              trend="+5%"
            />
            <StatCard
              title="热门文章"
              value={stats.popularArticles.length}
              icon="🔥"
              trend="Top 10"
            />
          </div>

          {/* 图表区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 文章阅读趋势 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">文章阅读趋势</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 热门文章排行 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">热门文章</h2>
              <div className="space-y-4">
                {stats.popularArticles.map((article: any, index: number) => (
                  <div key={article.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium truncate">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.viewCount} 阅读</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 最近文章 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">最近文章</h2>
            {/* 文章列表 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

### 4. 响应式设计实现

**技术选型**：Tailwind CSS v4 + 响应式组件

**核心功能**：
- PC端完整布局
- 移动端适配（导航栏折叠、侧边栏隐藏）
- 响应式网格布局
- 图片自适应调整

**实现思路**：

**布局组件示例**：
```typescript
// Header.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Blog
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            首页
          </Link>
          <Link to="/category" className="text-gray-700 hover:text-blue-600 transition-colors">
            分类
          </Link>
          <Link to="/tag" className="text-gray-700 hover:text-blue-600 transition-colors">
            标签
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
            关于
          </Link>
          <SearchBar />
          <Link to="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
            <User className="w-5 h-5" />
            <span>管理</span>
          </Link>
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 移动端导航 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              to="/category"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              分类
            </Link>
            <Link
              to="/tag"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              标签
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              关于
            </Link>
            <SearchBar />
            <Link
              to="/admin"
              className="block py-2 text-gray-700 hover:text-blue-600 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>管理</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
```

## 六、安全与性能优化

### 1. 安全优化

#### 后端安全
- **密码加密**：使用 BCrypt 密码哈希存储
- **JWT 安全**：设置合理的过期时间，使用刷新令牌机制
- **接口限流**：对登录接口等设置频率限制
- **SQL注入防护**：使用 MyBatis-Plus 预编译SQL
- **XSS防护**：对文章内容和评论进行HTML转义
- **CORS配置**：只允许特定域名访问API

#### 前端安全
- **XSS防护**：对用户输入内容进行转义处理
- **HTTPS**：部署时使用HTTPS协议
- **本地存储**：避免存储敏感信息
- **请求拦截**：在请求中添加CSRF保护

### 2. 性能优化

#### 前端优化
- **代码分割**：使用 React.lazy 和 Suspense 进行懒加载
- **图片优化**：实现图片懒加载和响应式图片
- **缓存策略**：对静态资源使用 CDN 加速
- **打包优化**：使用 Vite 打包优化插件
- **路由懒加载**：对管理员页面进行懒加载

#### 后端优化
- **数据库优化**：使用索引优化查询，避免全表扫描
- **缓存优化**：使用 Redis 缓存文章和热门数据
- **连接池优化**：配置合理的数据库连接池参数
- **响应压缩**：启用 Gzip 压缩
- **异步处理**：对邮件发送、数据统计等操作使用异步处理

## 七、总结

本架构设计方案提供了一个完整的博客系统实现方案，覆盖了所有核心功能需求。前端采用 React + TypeScript + ShadCN UI 实现简洁高级的界面，后端使用 SpringBoot + MyBatis-Plus 实现高效稳定的API服务。

系统具备完整的用户认证、文章管理、分类标签管理、评论管理、数据统计等功能，同时提供了响应式设计，适配不同设备。重点功能如编辑器、搜索、数据统计等都有详细的实现方案，确保系统的可扩展性和可维护性。

建议按照实现步骤规划逐步开发，先完成基础框架和公共功能，再实现管理员功能和高级功能，最后进行优化和测试，确保系统的稳定运行。
