import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Link } from 'react-router-dom';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              文章未找到
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              您访问的文章不存在或已被删除
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          {post.featuredImage && (
            <div className="h-64 overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose dark:prose-invert max-w-none mb-8">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('#')) {
                  const level = line.match(/^#+/);
                  if (level) {
                    const headingLevel = Math.min(level[0].length, 6);
                    const text = line.replace(/^#+/, '').trim();
                    const Heading = `h${headingLevel}` as keyof HTMLElementTagNameMap;
                    return <Heading key={index} className="mt-8 mb-4">{text}</Heading>;
                  }
                } else if (line.startsWith('```')) {
                  // 处理代码块
                  return null;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else if (line.startsWith('*')) {
                  return <li key={index} className="mb-2">{line.slice(1).trim()}</li>;
                } else {
                  return <p key={index} className="mb-4">{line}</p>;
                }
                return null;
              })}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${post.author}&background=random`}
                    alt={post.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {post.author}
                  </span>
                </div>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostPage;
