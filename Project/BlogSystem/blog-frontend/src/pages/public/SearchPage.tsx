import React from 'react';
import { useLocation } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import { BlogCard } from '../../components/common/BlogCard';

export const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const { data, isLoading, error } = useArticles({ search: query });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="text-xl text-red-500">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  const articles = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          搜索结果: "{query}"
        </h1>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">没有找到符合条件的文章</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};