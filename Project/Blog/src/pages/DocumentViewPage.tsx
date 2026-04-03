import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Folder, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '../context/ToastContext';

// 类型定义
interface ResourceFile {
  id: string;
  name: string;
  categoryId: string;
  fileType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const DocumentViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [file, setFile] = useState<ResourceFile | null>(null);
  const [category, setCategory] = useState<ResourceCategory | null>(null);

  useEffect(() => {
    loadFileData();
  }, [id]);

  const loadFileData = () => {
    if (!id) return;

    // 从本地存储加载数据
    const filesData = localStorage.getItem('resourceFiles');
    const categoriesData = localStorage.getItem('resourceCategories');

    if (filesData) {
      const files: ResourceFile[] = JSON.parse(filesData);
      const foundFile = files.find(f => f.id === id);
      if (foundFile) {
        setFile(foundFile);

        if (categoriesData) {
          const categories: ResourceCategory[] = JSON.parse(categoriesData);
          const foundCategory = categories.find(c => c.id === foundFile.categoryId);
          setCategory(foundCategory || null);
        }
      } else {
        showToast('文件不存在', 'error');
      }
    }
  };

  const handleDownload = () => {
    if (!file) return;

    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!file) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-200 dark:border-gray-700">
            <FileText size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              文件未找到
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              该文件不存在或已被删除
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
            >
              <ArrowLeft size={20} />
              返回资源页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面导航 */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/resources"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <ArrowLeft size={16} />
            返回资源页
          </Link>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download size={16} />
            下载文件
          </button>
        </div>

        {/* 文件信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FileText size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {file.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Folder size={16} />
                  <span>{category?.name || '未分类'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>修改于: {new Date(file.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 文件内容 */}
          <div className="prose dark:prose-invert max-w-none">
            {file.fileType === 'markdown' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 pb-1 border-b border-gray-200 dark:border-gray-700" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc list-outside mb-4 ml-6" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal list-outside mb-4 ml-6" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="text-gray-700 dark:text-gray-300 mb-1" {...props} />
                  ),
                  code: ({ ...props }) => (
                    <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900 dark:text-white" {...props} />
                  ),
                  pre: ({ ...props }) => (
                    <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-purple-600 pl-4 py-1 my-4 text-gray-700 dark:text-gray-300 italic" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a className="text-purple-600 dark:text-purple-400 hover:underline" {...props} />
                  ),
                  img: ({ ...props }) => (
                    <img className="max-w-full h-auto rounded-lg my-4" {...props} />
                  ),
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead className="bg-gray-100 dark:bg-gray-700" {...props} />
                  ),
                  th: ({ ...props }) => (
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white" {...props} />
                  ),
                  td: ({ ...props }) => (
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300" {...props} />
                  ),
                }}
              >
                {file.content}
              </ReactMarkdown>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white">
                  {file.content}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            文件类型: {file.fileType === 'markdown' ? 'Markdown' : '文本文件'}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Download size={16} />
              下载文件
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewPage;
