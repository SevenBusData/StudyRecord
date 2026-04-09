import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MessageSquare, Calendar } from 'lucide-react';
import type { Article } from '../../types';

interface BlogCardProps {
  article: Article;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* 封面图 */}
      {article.cover_image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* 内容 */}
      <div className="p-6">
        {/* 分类和日期 */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400">
            {article.category?.name || '未分类'}
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(article.created_at)}
          </div>
        </div>

        {/* 标题 */}
        <h2 className="text-xl font-semibold mb-2">
          <Link
            to={`/post/${article.id}`}
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            {article.title}
          </Link>
        </h2>

        {/* 摘要 */}
        {article.summary && (
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {article.summary}
          </p>
        )}

        {/* 标签 */}
        {(article.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(article.tags || []).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 阅读和评论数量 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.views} 阅读
            </span>
            <MessageSquare className="h-4 w-4 ml-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.comments_count} 评论
            </span>
          </div>

          <Link
            to={`/post/${article.id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            阅读更多 →
          </Link>
        </div>
      </div>
    </div>
  );
};
