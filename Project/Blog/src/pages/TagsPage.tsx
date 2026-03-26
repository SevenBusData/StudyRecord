import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import type { Tag } from '../types';

const TagsPage: React.FC = () => {
  const tags: Tag[] = Object.values(
    blogPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = {
            id: tag.toLowerCase().replace(/\s+/g, '-'),
            name: tag,
            slug: tag.toLowerCase().replace(/\s+/g, '-'),
            count: 0,
          };
        }
        acc[tag].count++;
      });
      return acc;
    }, {} as Record<string, Tag>)
  ).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            文章标签
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            按标签浏览文章
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tag/${tag.slug}`}
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:translate-y-[-4px] hover:shadow-lg"
            >
              <span className="text-sm font-medium">{tag.name}</span>
              <span className="ml-2 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
