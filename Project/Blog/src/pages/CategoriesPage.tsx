import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import type { Category } from '../types';

const CategoriesPage: React.FC = () => {
  const categories: Category[] = Object.values(
    blogPosts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = {
          id: post.category.toLowerCase().replace(/\s+/g, '-'),
          name: post.category,
          slug: post.category.toLowerCase().replace(/\s+/g, '-'),
          count: 0,
        };
      }
      acc[post.category].count++;
      return acc;
    }, {} as Record<string, Category>)
  ).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            文章分类
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            按分类浏览文章
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-transform hover:translate-y-[-4px] hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h2>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                  {category.count}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                查看该分类下的所有文章
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
