import axios from 'axios';
import type { ApiResponse, PaginatedResponse, Article, Category, Tag, Comment, User, Stats, LoginRequest, LoginResponse, RegisterRequest, ArticleRequest, CategoryRequest, TagRequest, CommentRequest } from '../types';

// 创建 API 实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 检查响应数据是否已经是 ApiResponse 格式
    if (response.data && 'success' in response.data && 'data' in response.data) {
      return response;
    }

    // 检查响应数据是否是数组（如文章列表）
    if (Array.isArray(response.data)) {
      response.data = {
        success: true,
        data: {
          data: response.data,
          total: response.data.length,
          page: 1,
          size: response.data.length,
          pages: 1,
        },
        message: 'Success',
        code: response.status,
      };
      return response;
    }

    // 检查响应数据是否是单篇文章（如 getArticle 响应）
    if (response.data && 'id' in response.data) {
      response.data = {
        success: true,
        data: response.data,
        message: 'Success',
        code: response.status,
      };
      return response;
    }

    // 否则，将响应数据包装成 ApiResponse 格式
    response.data = {
      success: true,
      data: response.data,
      message: 'Success',
      code: response.status,
    };
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    const errorResponse = {
      success: false,
      data: null,
      message: error.response?.data?.message || error.message,
      code: error.response?.status || 500,
    };
    return Promise.reject(errorResponse);
  }
);

// 认证 API
export const authApi = {
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> =>
    api.post('/auth/login', data).then(response => response.data),
  register: (data: RegisterRequest): Promise<ApiResponse<User>> =>
    api.post('/auth/register', data),
  me: (): Promise<ApiResponse<User>> =>
    api.get('/auth/me'),
  refresh: (): Promise<ApiResponse<{ token: string; refreshToken: string }>> => {
    const refreshToken = localStorage.getItem('refresh_token');
    return api.post('/auth/refresh', { refreshToken: refreshToken });
  },
};

// 文章 API
export const articleApi = {
  getArticles: (params?: {
    page?: number;
    size?: number;
    category?: number;
    tag?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<Article>>> =>
    api.get('/articles', { params }).then(response => response.data),
  getArticle: (id: number): Promise<ApiResponse<Article>> =>
    api.get(`/articles/${id}`).then(response => response.data),
  createArticle: (data: ArticleRequest): Promise<ApiResponse<Article>> =>
    api.post('/articles', data).then(response => response.data),
  updateArticle: (id: number, data: Partial<ArticleRequest>): Promise<ApiResponse<Article>> =>
    api.put(`/articles/${id}`, data).then(response => response.data),
  deleteArticle: (id: number): Promise<ApiResponse<void>> =>
    api.delete(`/articles/${id}`).then(response => response.data),
  importArticle: (file: File): Promise<ApiResponse<Article>> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/articles/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(response => response.data);
  },
};

// 分类 API
export const categoryApi = {
  getCategories: (): Promise<ApiResponse<Category[]>> =>
    api.get('/categories'),
  getCategory: (id: number): Promise<ApiResponse<Category>> =>
    api.get(`/categories/${id}`),
  createCategory: (data: CategoryRequest): Promise<ApiResponse<Category>> =>
    api.post('/categories', data),
  updateCategory: (id: number, data: Partial<CategoryRequest>): Promise<ApiResponse<Category>> =>
    api.put(`/categories/${id}`, data),
  deleteCategory: (id: number): Promise<ApiResponse<void>> =>
    api.delete(`/categories/${id}`),
};

// 标签 API
export const tagApi = {
  getTags: (): Promise<ApiResponse<Tag[]>> =>
    api.get('/tags'),
  getTag: (id: number): Promise<ApiResponse<Tag>> =>
    api.get(`/tags/${id}`),
  createTag: (data: TagRequest): Promise<ApiResponse<Tag>> =>
    api.post('/tags', data),
  updateTag: (id: number, data: Partial<TagRequest>): Promise<ApiResponse<Tag>> =>
    api.put(`/tags/${id}`, data),
  deleteTag: (id: number): Promise<ApiResponse<void>> =>
    api.delete(`/tags/${id}`),
};

// 评论 API
export const commentApi = {
  getArticleComments: (articleId: number, params?: {
    page?: number;
    size?: number;
  }): Promise<ApiResponse<PaginatedResponse<Comment>>> =>
    api.get(`/comments/article/${articleId}`, { params }),
  getComment: (id: number): Promise<ApiResponse<Comment>> =>
    api.get(`/comments/${id}`),
  createComment: (data: CommentRequest): Promise<ApiResponse<Comment>> =>
    api.post('/comments', data),
  updateComment: (id: number, data: { content: string }): Promise<ApiResponse<Comment>> =>
    api.put(`/comments/${id}`, data),
  deleteComment: (id: number): Promise<ApiResponse<void>> =>
    api.delete(`/comments/${id}`),
};

// 统计 API
export const statsApi = {
  getCoreStats: (): Promise<ApiResponse<Stats>> =>
    api.get('/stats/core'),
  getViewsStats: (): Promise<ApiResponse<{ month: string; views: number }[]>> =>
    api.get('/stats/views'),
  getCategoriesStats: (): Promise<ApiResponse<{ category: string; count: number }[]>> =>
    api.get('/stats/categories'),
  getPopularArticles: (): Promise<ApiResponse<Article[]>> =>
    api.get('/stats/popular'),
};

export default api;
