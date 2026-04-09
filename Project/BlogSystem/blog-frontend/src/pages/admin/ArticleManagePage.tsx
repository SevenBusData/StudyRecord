import React, { useState, useEffect } from 'react';
import { articleApi } from '../../api';
import { Loader2 } from 'lucide-react';
import type { Article } from '../../types';

export const ArticleManagePage: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);

  console.log('Component rendering, articles state:', articles);

  useEffect(() => {
    console.log('useEffect triggered');
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles...');
      const response = await articleApi.getArticles();
      console.log('Articles response:', response);
      if (response.success) {
        console.log('Articles data:', response.data.data);
        setArticles(response.data.data);
      }
    } catch (error) {
      console.error('Fetch articles error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const response = await articleApi.importArticle(file);
      if (response.success) {
        alert('文章导入成功！');
        fetchArticles();
      } else {
        alert('文章导入失败：' + response.message);
      }
    } catch (error: unknown) {
      console.error('Import error:', error);
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      alert('文章导入失败：' + errorMessage);
    } finally {
      setIsImporting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      await articleApi.deleteArticle(id);
      fetchArticles();
    } catch (error) {
      console.error('Delete error:', error);
      alert('删除失败');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Manage Articles</h1>
          <div className="flex space-x-4">
            <label className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer">
              {isImporting ? <Loader2 className="inline h-4 w-4 animate-spin mr-2" /> : '导入MD文件'}
              <input
                type="file"
                accept=".md"
                className="hidden"
                onChange={handleImport}
                disabled={isImporting}
              />
            </label>
            <a
              href="/admin/articles/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Create New Article
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    暂无文章
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="border-t">
                    <td className="py-3 px-4">{article.title}</td>
                    <td className="py-3 px-4">{article.category?.name || '未分类'}</td>
                    <td className="py-3 px-4">{article.status}</td>
                    <td className="py-3 px-4">
                      {new Date(article.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <a
                          href={`/admin/articles/${article.id}/edit`}
                          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
