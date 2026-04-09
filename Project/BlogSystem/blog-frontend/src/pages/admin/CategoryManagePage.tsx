import React from 'react';

export const CategoryManagePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Manage Categories</h1>
          <a
            href="/admin/categories/create"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Create New Category
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Articles</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 px-4">Frontend Development</td>
                <td className="py-3 px-4">Articles about frontend development</td>
                <td className="py-3 px-4">15</td>
                <td className="py-3 px-4">2025-03-20</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <a
                      href="/admin/categories/1/edit"
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </a>
                    <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Backend Development</td>
                <td className="py-3 px-4">Articles about backend development</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4">2025-03-21</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <a
                      href="/admin/categories/2/edit"
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </a>
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
