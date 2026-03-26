import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            一名热爱技术的前端开发者
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                张三
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                前端开发者 / 技术博主
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              个人简介
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              我是一名热爱技术的前端开发者，专注于 React、TypeScript 和现代前端架构。我喜欢分享我的学习历程和技术经验，希望能够帮助到更多的开发者。
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              在工作之余，我会写一些技术博客，记录我在开发过程中遇到的问题和解决方法。我相信通过分享和交流，我们可以共同进步。
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              技术栈
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'React',
                'TypeScript',
                'JavaScript',
                'HTML5',
                'CSS3',
                'Tailwind CSS',
                'Redux',
                'Node.js',
                'Git',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              联系方式
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400 mr-4">邮箱：</span>
                <a
                  href="mailto:youremail@example.com"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  youremail@example.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400 mr-4">GitHub：</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  github.com/yourusername
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400 mr-4">Twitter：</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  twitter.com/yourusername
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
