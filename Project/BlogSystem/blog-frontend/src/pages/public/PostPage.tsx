import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '../../hooks/useArticles';
import { formatDate } from '../../utils/date';

export const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articleId = id ? parseInt(id) : 0;
  const { data: article, isLoading, isError } = useArticle(articleId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The requested article could not be found.</p>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-500">
            <span className="mr-4">{formatDate(article.created_at)}</span>
            <span className="mr-4">{article.user?.username || 'Unknown'}</span>
            {article.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                {article.category.name}
              </span>
            )}
          </div>
        </header>

        <div className="mb-8">
          {article.cover_image && (
            <div className="mb-6">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose max-w-none">
            {/* 文章内容将通过 dangerouslySetInnerHTML 渲染 */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>

        <footer className="border-t pt-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags && article.tags.map(tag => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
};
