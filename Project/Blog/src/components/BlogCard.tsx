import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg border border-gray-200 dark:border-gray-700">
      {post.featuredImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
            {post.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {post.date}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {post.readTime}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          <Link
            to={`/post/${post.id}`}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
          <Link
            to={`/post/${post.id}`}
            className="text-purple-600 dark:text-purple-400 font-medium text-sm hover:underline"
          >
            阅读更多 →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
