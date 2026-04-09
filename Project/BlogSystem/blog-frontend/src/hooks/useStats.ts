import { useQuery } from '@tanstack/react-query';
import type { Stats } from '../types';

export const useCoreStats = () => {
  // 模拟数据
  const mockStats: Stats = {
    article_count: 10,
    category_count: 5,
    tag_count: 20,
    comment_count: 50,
    total_views: 10000,
    total_likes: 500,
    popular_articles: [],
    views_by_month: [],
    articles_by_category: [],
  };

  return useQuery<Stats, Error>({
    queryKey: ['core-stats'],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockStats), 500);
      });
    },
  });
};

export const useViewsStats = () => {
  // 模拟数据
  const mockViewsStats = [
    { month: '1月', views: 1000 },
    { month: '2月', views: 1500 },
    { month: '3月', views: 2000 },
    { month: '4月', views: 2500 },
    { month: '5月', views: 3000 },
  ];

  return useQuery<{ month: string; views: number }[], Error>({
    queryKey: ['views-stats'],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockViewsStats), 500);
      });
    },
  });
};

export const useCategoriesStats = () => {
  // 模拟数据
  const mockCategoriesStats = [
    { category: '前端开发', count: 15 },
    { category: '后端开发', count: 10 },
    { category: '数据库', count: 8 },
    { category: '架构设计', count: 6 },
    { category: '工具资源', count: 12 },
    { category: '生活随笔', count: 20 },
  ];

  return useQuery<{ category: string; count: number }[], Error>({
    queryKey: ['categories-stats'],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockCategoriesStats), 500);
      });
    },
  });
};

export const usePopularArticles = () => {
  // 模拟数据
  const mockPopularArticles = [
    { article: 'React 18 新特性介绍', views: 1000 },
    { article: 'TypeScript 类型系统详解', views: 800 },
    { article: '前端性能优化最佳实践', views: 600 },
    { article: '微前端架构设计', views: 400 },
  ];

  return useQuery<{ article: string; views: number }[], Error>({
    queryKey: ['popular-articles'],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockPopularArticles), 500);
      });
    },
  });
};
