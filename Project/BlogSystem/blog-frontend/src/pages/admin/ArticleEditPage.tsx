import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleApi } from '../../api';
import { Loader2 } from 'lucide-react';
import type { Tag } from '../../types';

export const ArticleEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    tags: ['React', 'JavaScript', 'CSS'],
    content: '',
    coverImage: '',
    summary: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        setIsFetching(true);
        try {
          // 使用 articleApi.getArticle() 方法，正确处理响应格式
          const response = await articleApi.getArticle(parseInt(id));
          console.log('API Response:', response);
          const article = response.data;
          setFormData({
            title: article.title,
            categoryId: article.category_id?.toString() || '',
            tags: article.tags?.map((tag: Tag) => tag.name) || ['React', 'JavaScript', 'CSS'],
            content: article.content,
            coverImage: article.cover_image || '',
            summary: article.summary || '',
            status: article.status as 'DRAFT' | 'PUBLISHED',
          });
        } catch (error) {
          console.error('Fetch article error:', error);
          alert('获取文章数据失败');
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const articleData = {
        title: formData.title,
        content: formData.content,
        summary: formData.summary,
        cover_image: formData.coverImage,
        category_id: parseInt(formData.categoryId),
        tags: [1, 2, 3], // 暂时使用固定标签ID
        status: formData.status,
      };

      if (id) {
        // 更新文章
        await articleApi.updateArticle(parseInt(id), articleData);
      } else {
        // 创建新文章
        await articleApi.createArticle(articleData);
      }

      navigate('/admin/articles');
    } catch (error) {
      console.error('Save error:', error);
      alert('保存失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  if (isFetching) {
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{id ? '编辑文章' : '创建文章'}</h1>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="inline h-4 w-4 animate-spin mr-2" /> : '保存'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
              <input
                type="text"
                name="title"
                placeholder="请输入文章标题"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <select
                name="categoryId"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">请选择分类</option>
                <option value="1">技术</option>
                <option value="2">生活</option>
                <option value="3">工作</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">标签</label>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs cursor-pointer"
                    onClick={() => handleTagRemove(tag)}
                  >
                    {tag}
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="添加标签"
                  className="px-2 py-0.5 border border-gray-300 rounded-full text-xs w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
              <textarea
                name="content"
                placeholder="请输入文章内容"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
              <input
                type="file"
                name="coverImage"
                className="w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // 简单处理：创建本地URL或上传到服务器
                    const imageUrl = URL.createObjectURL(file);
                    setFormData(prev => ({ ...prev, coverImage: imageUrl }));
                  }
                }}
              />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="封面预览"
                  className="mt-2 h-32 w-32 object-cover rounded"
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
              <textarea
                name="summary"
                placeholder="请输入文章摘要"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={formData.summary}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  id="publish"
                  checked={formData.status === 'PUBLISHED'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    status: e.target.checked ? 'PUBLISHED' : 'DRAFT'
                  }))}
                />
                <label htmlFor="publish" className="ml-2 text-sm text-gray-700">
                  立即发布
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="inline h-4 w-4 animate-spin mr-2" /> : '保存'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
