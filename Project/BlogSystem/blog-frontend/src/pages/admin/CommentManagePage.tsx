import React from 'react';

export const CommentManagePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Comments</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Article</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Comment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Author</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 px-4">First Article</td>
                <td className="py-3 px-4">Great article! Thanks for sharing.</td>
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">2025-04-01</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Second Article</td>
                <td className="py-3 px-4">Very informative. Looking forward to more posts.</td>
                <td className="py-3 px-4">Jane Smith</td>
                <td className="py-3 px-4">2025-04-02</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
