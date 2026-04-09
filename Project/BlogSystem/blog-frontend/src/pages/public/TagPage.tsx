import React from 'react';
import { useParams } from 'react-router-dom';

export const TagPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tagId = parseInt(id || '0', 10);

  // 模拟数据
  const tag = {
    id: tagId,
    name: 'React',
    description: '关于 React 的文章',
    count: 5,
  };

  const articles = [
    {
      id: 1,
      title: 'React Hooks 从入门到精通',
      summary: '深入了解 React Hooks 的使用方法，包括 useState、useEffect、useContext 等常用 Hook 的使用。',
      category: '技术',
      author: '张三',
      createdAt: '2023-09-01',
      tags: ['React', 'Hooks'],
      views: 1000,
    },
    {
      id: 3,
      title: 'React 组件设计模式',
      summary: '介绍 React 组件设计模式，包括高阶组件、Render Props、Context API 等。',
      category: '技术',
      author: '王五',
      createdAt: '2023-08-15',
      tags: ['React', '组件设计'],
      views: 1500,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold text-gray-800">{tag.name}</span>
          <span className="text-sm text-gray-500 ml-2">({tag.count} 篇文章)</span>
        </div>
        <p className="text-gray-600">{tag.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-2">
              <span className="text-sm text-blue-600 mr-2">{article.category}</span>
              <span className="text-sm text-gray-500 mr-2">{article.createdAt}</span>
              <span className="text-sm text-gray-500">
                <span className="mr-1">👁️</span>
                {article.views}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.summary}</p>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <img
                  src={`https://randomuser.me/api/portraits/${article.author === '张三' ? 'men' : 'women'}/32.jpg`}
                  alt={article.author}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">{article.author}</span>
              </div>
              <div className="flex">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
