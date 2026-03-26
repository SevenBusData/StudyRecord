import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">My Blog</h3>
            <p className="text-gray-600 dark:text-gray-400">
              分享技术文章，记录学习历程
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">联系我</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:youremail@example.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  youremail@example.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">订阅</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              订阅我的博客，获取最新文章
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="请输入您的邮箱"
                className="px-4 py-2 flex-1 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button className="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-r-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} My Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
