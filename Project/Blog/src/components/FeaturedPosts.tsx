import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { blogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types';

const FeaturedPosts: React.FC = () => {
  // 假设前两篇文章是精选内容
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white">
          精选文章
        </h2>
        <Link
          to="/categories"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
        >
          查看全部
          <span className="ml-2">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredPosts.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;