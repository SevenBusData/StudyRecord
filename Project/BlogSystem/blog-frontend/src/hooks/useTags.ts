import { useQuery } from "@tanstack/react-query";
import type { Tag } from "../types";

// 模拟数据
const mockTags: Tag[] = [
  { id: 1, name: "React", article_count: 12, slug: "react", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 2, name: "JavaScript", article_count: 18, slug: "javascript", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 3, name: "TypeScript", article_count: 10, slug: "typescript", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 4, name: "Node.js", article_count: 8, slug: "nodejs", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 5, name: "MySQL", article_count: 6, slug: "mysql", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 6, name: "MongoDB", article_count: 4, slug: "mongodb", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 7, name: "Webpack", article_count: 5, slug: "webpack", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 8, name: "Docker", article_count: 3, slug: "docker", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 9, name: "Git", article_count: 11, slug: "git", created_at: "2023-01-01", updated_at: "2023-01-01" },
  { id: 10, name: "Vue", article_count: 7, slug: "vue", created_at: "2023-01-01", updated_at: "2023-01-01" },
];

// 模拟API函数
export const fetchTags = async (): Promise<Tag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTags);
    }, 500);
  });
};

// Hook
export const useTags = () => {
  return useQuery<Tag[], Error>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5, // 5分钟后数据过期
  });
};
