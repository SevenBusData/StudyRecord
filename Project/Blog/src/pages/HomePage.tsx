import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types';

const HomePage: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 页面加载后显示动画
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 grid-bg">
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden py-20 px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
                欢迎来到我的技术博客
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              探索编程世界的
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-500 dark:to-amber-700">
                无限可能
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              分享技术文章，记录学习历程，解答开发中的困惑，共同成长
            </p>

            {/* 搜索栏 */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* 统计信息 */}
            <div className="flex justify-center space-x-8 md:space-x-16 text-sm md:text-base">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {blogPosts.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  技术文章
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  技术标签
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {Array.from(new Set(blogPosts.map(post => post.category))).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  文章分类
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section
        className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            最新文章
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-700 to-amber-500 mx-auto" />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              没有找到相关文章
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              尝试使用其他关键词搜索
            </p>
          </div>
        )}
      </section>

      {/* 分类导航 */}
      <section
        className={`bg-white dark:bg-gray-800 py-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              文章分类
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-700 to-amber-500 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from(new Set(blogPosts.map(post => post.category))).map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="group relative bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl p-6 text-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-3">
                  {category === '前端开发' && '💻'}
                  {category === '后端开发' && '🔧'}
                  {category === '移动开发' && '📱'}
                  {category === '人工智能' && '🤖'}
                  {category === '大数据' && '📊'}
                  {category === '云计算' && '☁️'}
                </div>
                <h3 className="text-lg font-medium mb-1">{category}</h3>
                <p className="text-sm text-amber-100">
                  {blogPosts.filter(post => post.category === category).length} 篇文章
                </p>
                <div className="absolute inset-0 rounded-xl bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 标签云 */}
      <section
        className={`py-16 px-4 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              技术标签
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-700 to-amber-500 mx-auto" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(
              blogPosts.reduce((acc: { [key: string]: number }, post: BlogPost) => {
                post.tags.forEach(tag => {
                  acc[tag] = (acc[tag] || 0) + 1;
                });
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([tag, count]) => (
                <Link
                  key={tag}
                  to={`/tag/${tag}`}
                  className="group px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-600 hover:text-white rounded-full text-sm font-medium transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-amber-500"
                >
                  {tag}
                  <span className="ml-2 text-xs opacity-70">{count}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 作者信息 */}
      <section
        className={`bg-gradient-to-r from-amber-600 to-amber-700 py-16 px-4 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-4xl">
                  👨‍💻
                </div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              关于我
            </h2>
            <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
              我是一名后端开发工程师，专注于Java、Spring Boot、MySQL等技术栈。
              我喜欢分享技术文章，记录学习历程，解答开发中的困惑。
              希望我的博客能帮助到更多的开发者。
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-amber-700 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://juejin.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 rounded-lg font-medium transition-colors duration-300"
              >
                掘金
              </a>
              <a
                href="mailto:contact@example.com"
                className="px-6 py-3 bg-amber-800 text-white hover:bg-amber-900 rounded-lg font-medium transition-colors duration-300"
              >
                联系我
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
