import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Folder, FileText, Upload, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// 类型定义
interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ResourceFile {
  id: string;
  name: string;
  categoryId: string;
  fileType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [files, setFiles] = useState<ResourceFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [uploadFileData, setUploadFileData] = useState({
    categoryId: '',
    file: null as File | null,
    fileName: '',
  });

  // 模拟从本地存储加载数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedCategories = localStorage.getItem('resourceCategories');
    const savedFiles = localStorage.getItem('resourceFiles');

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  };

  const saveData = () => {
    localStorage.setItem('resourceCategories', JSON.stringify(categories));
    localStorage.setItem('resourceFiles', JSON.stringify(files));
  };

  // 分类管理
  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) {
      showToast('请输入分类名称', 'error');
      return;
    }

    const category: ResourceCategory = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      description: newCategory.description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCategories([...categories, category]);
    saveData();
    setNewCategory({ name: '', description: '' });
    setIsCreateCategoryModalOpen(false);
    showToast('分类创建成功', 'success');
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (files.some(file => file.categoryId === categoryId)) {
      showToast('该分类下还有文件，无法删除', 'error');
      return;
    }

    setCategories(categories.filter(category => category.id !== categoryId));
    saveData();
    showToast('分类删除成功', 'success');
  };

  // 文件管理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileData(prev => ({
        ...prev,
        file,
        fileName: file.name,
      }));
    }
  };

  const handleUploadFile = () => {
    if (!uploadFileData.categoryId) {
      showToast('请选择文件分类', 'error');
      return;
    }

    if (!uploadFileData.file) {
      showToast('请选择要上传的文件', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!uploadFileData.file) return;
      const newFile: ResourceFile = {
        id: Date.now().toString(),
        name: uploadFileData.fileName,
        categoryId: uploadFileData.categoryId,
        fileType: uploadFileData.file.name.endsWith('.md') ? 'markdown' : 'text',
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setFiles([...files, newFile]);
      saveData();
      setUploadFileData({ categoryId: '', file: null, fileName: '' });
      setIsUploadFileModalOpen(false);
      showToast('文件上传成功', 'success');
    };
    reader.readAsText(uploadFileData.file);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
    saveData();
    showToast('文件删除成功', 'success');
  };

  const handleFileClick = (fileId: string) => {
    navigate(`/resources/document/${fileId}`);
  };

  const filteredFiles = selectedCategory
    ? files.filter(file => file.categoryId === selectedCategory)
    : files;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            资源管理
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            管理和分享您的技术资源文档
          </p>
        </header>

        {/* 操作按钮 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setIsCreateCategoryModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            <Plus size={20} />
            创建分类
          </button>
          <button
            onClick={() => setIsUploadFileModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Upload size={20} />
            上传文件
          </button>
        </div>

        {/* 分类导航 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Folder size={20} />
            分类导航
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              全部
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 分类列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Folder size={20} />
            分类管理
          </h2>
          {categories.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Folder size={48} className="mx-auto mb-4 opacity-50" />
              <p>暂无分类，请创建第一个分类</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-transform hover:translate-y-[-2px] hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {category.description || '暂无描述'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>创建于: {new Date(category.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>文件: {files.filter(f => f.categoryId === category.id).length}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
                        title="删除分类"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 文件列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText size={20} />
            文件管理
          </h2>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p>暂无文件，请上传文件</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-transform hover:translate-y-[-2px] hover:shadow-md cursor-pointer"
                  onClick={() => handleFileClick(file.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {file.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        分类: {categories.find(c => c.id === file.categoryId)?.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>类型: {file.fileType === 'markdown' ? 'Markdown' : '文本'}</span>
                        <span>•</span>
                        <span>修改于: {new Date(file.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
                        title="删除文件"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 创建分类模态框 */}
      {isCreateCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              创建分类
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  分类名称
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="请输入分类名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  分类描述
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="请输入分类描述"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateCategory}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  创建
                </button>
                <button
                  onClick={() => setIsCreateCategoryModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 上传文件模态框 */}
      {isUploadFileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              上传文件
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  选择分类
                </label>
                <select
                  value={uploadFileData.categoryId}
                  onChange={(e) => setUploadFileData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择分类</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  选择文件
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".md,.txt,.html"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <Upload size={24} className="mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {uploadFileData.fileName || '点击选择要上传的文件'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      支持 .md, .txt, .html 格式
                    </p>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUploadFile}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  上传
                </button>
                <button
                  onClick={() => setIsUploadFileModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  };

export default ResourcesPage;
