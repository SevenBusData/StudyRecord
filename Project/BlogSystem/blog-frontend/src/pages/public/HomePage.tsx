import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import { BlogCard } from '../../components/common/BlogCard';
import { Search } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { data, isLoading, error } = useArticles({ page: 1, size: 10 });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const articles = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 搜索框 */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get('q') as string;
              if (query.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
              }
            }}
            className="relative"
          >
            <input
              type="text"
              name="q"
              placeholder="搜索文章..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>

      {/* 无文章时的提示 */}
      {articles.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500 dark:text-gray-400">
            暂无文章，敬请期待。
          </div>
        </div>
      )}

      {/* 分页 */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          <button
            disabled
            className="px-4 py-2 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-md cursor-not-allowed"
          >
            上一页
          </button>
          <button className="px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-md">
            1
          </button>
          <button
            disabled
            className="px-4 py-2 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-md cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};
