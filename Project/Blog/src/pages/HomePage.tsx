import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import { blogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types';

const HomePage: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  const handleSearch = (query: string) => {
    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            欢迎来到我的博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            分享技术文章，记录学习历程
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              没有找到相关文章
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
