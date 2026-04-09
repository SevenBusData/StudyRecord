// 用户类型
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  nickname?: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

// 分类类型
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  article_count: number;
  created_at: string;
  updated_at: string;
}

// 标签类型
export interface Tag {
  id: number;
  name: string;
  slug: string;
  article_count: number;
  created_at: string;
  updated_at: string;
}

// 文章类型
export interface Article {
  id: number;
  title: string;
  content: string;
  summary?: string;
  cover_image?: string;
  views: number;
  likes: number;
  status: 'DRAFT' | 'PUBLISHED' | 'DELETED';
  category_id?: number;
  user_id: number;
  category?: Category;
  tags?: Tag[];
  user?: User;
  comments_count?: number;
  deleted: number;
  created_at: string;
  updated_at: string;
}

// 评论类型
export interface Comment {
  id: number;
  content: string;
  user?: User;
  article: Article;
  parent?: Comment;
  replies: Comment[];
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

// 统计数据类型
export interface Stats {
  article_count: number;
  category_count: number;
  tag_count: number;
  comment_count: number;
  total_views: number;
  total_likes: number;
  popular_articles: Article[];
  views_by_month: { month: string; views: number }[];
  articles_by_category: { category: string; count: number }[];
}

// 分页类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
}

// 登录请求类型
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应类型
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user?: User;
}

// 注册请求类型
export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  nickname?: string;
}

// 文章创建/更新请求类型
export interface ArticleRequest {
  title: string;
  content: string;
  summary?: string;
  cover_image?: string;
  category_id?: number;
  tags?: number[];
  status: 'DRAFT' | 'PUBLISHED';
}

// 分类创建/更新请求类型
export interface CategoryRequest {
  name: string;
  slug: string;
  description?: string;
}

// 标签创建/更新请求类型
export interface TagRequest {
  name: string;
  slug: string;
}

// 评论创建请求类型
export interface CommentRequest {
  content: string;
  article_id: number;
  parent_id?: number;
}

// 分类类型
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  article_count: number;
  created_at: string;
  updated_at: string;
}

// 标签类型
export interface Tag {
  id: number;
  name: string;
  slug: string;
  article_count: number;
  created_at: string;
  updated_at: string;
}

// 文章类型
export interface Article {
  id: number;
  title: string;
  content: string;
  summary?: string;
  cover_image?: string;
  views: number;
  likes: number;
  status: 'DRAFT' | 'PUBLISHED' | 'DELETED';
  category_id?: number;
  user_id: number;
  category?: Category;
  tags?: Tag[];
  user?: User;
  comments_count?: number;
  deleted: number;
  created_at: string;
  updated_at: string;
}

// 评论类型
export interface Comment {
  id: number;
  content: string;
  user?: User;
  article: Article;
  parent?: Comment;
  replies: Comment[];
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

// 统计数据类型
export interface Stats {
  article_count: number;
  category_count: number;
  tag_count: number;
  comment_count: number;
  total_views: number;
  total_likes: number;
  popular_articles: Article[];
  views_by_month: { month: string; views: number }[];
  articles_by_category: { category: string; count: number }[];
}

// 分页类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
}

// 登录请求类型
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应类型
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user?: User;
}

// 注册请求类型
export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  nickname?: string;
}

// 文章创建/更新请求类型
export interface ArticleRequest {
  title: string;
  content: string;
  summary?: string;
  cover_image?: string;
  category_id?: number;
  tags?: number[];
  status: 'DRAFT' | 'PUBLISHED';
}

// 分类创建/更新请求类型
export interface CategoryRequest {
  name: string;
  slug: string;
  description?: string;
}

// 标签创建/更新请求类型
export interface TagRequest {
  name: string;
  slug: string;
}

// 评论创建请求类型
export interface CommentRequest {
  content: string;
  article_id: number;
  parent_id?: number;
}
