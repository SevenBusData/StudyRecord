import { useQuery } from '@tanstack/react-query';
import type { Article, PaginatedResponse } from '../types';
import { articleApi } from '../api';

export const useArticles = (params?: {
  page?: number;
  size?: number;
  category?: number;
  tag?: number;
  search?: string;
}) => {
  const { page = 1, size = 10, category, tag, search } = params || {};

  return useQuery<PaginatedResponse<Article>, Error>({
    queryKey: ['articles', page, size, category, tag, search],
    queryFn: async () => {
      const response = await articleApi.getArticles({ page, size, category, tag, search });
      return response.data;
    },
    enabled: true,
  });
};

export const useArticle = (id: number) => {
  return useQuery<Article, Error>({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await articleApi.getArticle(id);
      return response.data;
    },
    enabled: id > 0,
  });
};
