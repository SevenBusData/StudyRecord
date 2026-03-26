import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const TagPage: React.FC = () => {
  const { slug } = useParams();
  const tagName = Object.keys(
    blogPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
        if (!acc[tagSlug]) {
          acc[tagSlug] = tag;
        }
      });
      return acc;
    }, {} as Record<string, string>)
  ).find((key) => key === slug);

  const posts = blogPosts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, '-') === slug)
  );

  if (!tagName) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              标签未找到
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              您访问的标签不存在
            </p>
            <Link
              to="/tags"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              返回标签页面
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
            标签: {tagName}
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
            to="/tags"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            查看所有标签
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TagPage;
