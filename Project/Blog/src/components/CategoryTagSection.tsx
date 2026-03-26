import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types';

const CategoryTagSection: React.FC = () => {
  // 获取所有分类
  const categories = Array.from(new Set(blogPosts.map((post: BlogPost) => post.category)));

  // 获取所有标签并统计出现次数
  const tags = blogPosts.reduce((acc: { [key: string]: number }, post: BlogPost) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // 将标签转换为数组并排序
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 分类 */}
        <div>
          <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-6">
            文章分类
          </h3>
          <div className="space-y-3">
            {categories.map((category) => {
              const count = blogPosts.filter((post: BlogPost) => post.category === category).length;
              return (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {category}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-sm">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 标签云 */}
        <div>
          <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-6">
            标签云
          </h3>
          <div className="flex flex-wrap gap-2">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="px-3 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                style={{
                  fontSize: `${14 + count * 2}px`,
                }}
              >
                {tag}
                <span className="ml-1 text-gray-400 dark:text-gray-500 text-xs">
                  ({count})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryTagSection;