import { useQuery } from "@tanstack/react-query";
import type { Category } from "../types";

// 模拟数据
const mockCategories: Category[] = [
  { id: 1, name: "前端开发", description: "React、Vue、TypeScript等前端技术", article_count: 15, slug: "frontend", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 2, name: "后端开发", description: "Node.js、Java、Python等后端技术", article_count: 10, slug: "backend", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 3, name: "数据库", description: "MySQL、MongoDB、Redis等数据库技术", article_count: 8, slug: "database", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 4, name: "架构设计", description: "系统架构、设计模式等", article_count: 6, slug: "architecture", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 5, name: "工具资源", description: "开发工具、资源推荐", article_count: 12, slug: "tools", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 6, name: "生活随笔", description: "个人生活、学习笔记", article_count: 20, slug: "life", created_at: "2023-01-01", updated_at: "2023-01-01" },
];

// 模拟API函数
export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 500);
  });
};

// Hook
export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5分钟后数据过期
  });
};
