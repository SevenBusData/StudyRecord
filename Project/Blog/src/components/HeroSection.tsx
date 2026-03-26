import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
              欢迎来到我的博客
            </h1>
            <p className="text-lg text-blue-700 dark:text-blue-200 mb-8 leading-relaxed">
              分享技术文章，记录学习历程，探索编程世界的无限可能
            </p>
            <div className="flex space-x-4">
              <a
                href="/categories"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                浏览文章
              </a>
              <a
                href="/about"
                className="bg-white dark:bg-blue-800 hover:bg-gray-100 dark:hover:bg-blue-700 text-blue-600 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors border border-blue-200 dark:border-blue-600"
              >
                了解更多
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-blue-600 shadow-xl">
                <div className="text-8xl md:text-10xl text-blue-400 dark:text-blue-300">
                  💻
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🚀
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;