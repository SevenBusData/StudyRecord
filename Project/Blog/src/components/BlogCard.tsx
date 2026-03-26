import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 card-hover"
    >
      <div className="relative h-64 overflow-hidden">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 bg-amber-700 text-white text-xs font-medium rounded-full mb-3">
            {post.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {post.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center mr-4">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {post.date}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {post.readTime}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-md"
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
          className="inline-flex items-center text-amber-700 dark:text-amber-400 font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-300 group/read-more"
        >
          阅读更多
          <span className="ml-2 transform group-hover/read-more:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {/* 底部装饰线 */}
      <div className="h-1 bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-500 dark:to-amber-700 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </article>
  );
};

export default BlogCard;
