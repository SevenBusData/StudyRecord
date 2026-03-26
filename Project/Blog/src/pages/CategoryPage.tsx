import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const CategoryPage: React.FC = () => {
  const { slug } = useParams();
  const categoryName = Object.keys(
    blogPosts.reduce((acc, post) => {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      if (!acc[categorySlug]) {
        acc[categorySlug] = post.category;
      }
      return acc;
    }, {} as Record<string, string>)
  ).find((key) => key === slug);

  const posts = blogPosts.filter((post) =>
    post.category.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!categoryName) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              分类未找到
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              您访问的分类不存在
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              返回分类页面
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {posts.length} 篇文章
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            查看所有分类
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
