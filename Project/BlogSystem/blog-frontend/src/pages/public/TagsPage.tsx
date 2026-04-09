import React from 'react';
import { useTags } from '../../hooks/useTags';

export const TagsPage: React.FC = () => {
  const { data: tags, isLoading, isError } = useTags();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="px-4 py-2 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !tags) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tags Not Found</h1>
          <p className="text-gray-600 mb-8">No tags were found.</p>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Tags</h1>

      <div className="flex flex-wrap gap-4">
        {tags.map(tag => (
          <a
            key={tag.id}
            href={`/tags/${tag.id}`}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
          >
            {tag.name} ({tag.article_count})
          </a>
        ))}
      </div>
    </div>
  );
};
