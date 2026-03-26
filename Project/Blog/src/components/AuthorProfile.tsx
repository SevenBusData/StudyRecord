import React from 'react';

const AuthorProfile: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden border-4 border-blue-200 dark:border-blue-700 mx-auto">
            <div className="text-4xl md:text-5xl text-blue-500 dark:text-blue-400">
              👨‍💻
            </div>
          </div>
        </div>
        <div className="md:w-2/3 md:pl-12 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white mb-4">
            关于我
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            我是一名热爱编程的开发者，专注于前端技术和全栈开发。我喜欢分享我的学习经验和技术见解，希望能帮助到更多的开发者。
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <span className="mr-2">🐙</span>
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <span className="mr-2">🐦</span>
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <span className="mr-2">💼</span>
              LinkedIn
            </a>
            <a
              href="mailto:contact@example.com"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <span className="mr-2">📧</span>
              联系我
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorProfile;