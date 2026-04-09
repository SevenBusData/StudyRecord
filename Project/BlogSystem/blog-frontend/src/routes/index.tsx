import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import App from '../App';
import { HomePage } from '../pages/public/HomePage';
import { PostPage } from '../pages/public/PostPage';
import { CategoriesPage } from '../pages/public/CategoriesPage';
import { TagsPage } from '../pages/public/TagsPage';
import { AboutPage } from '../pages/public/AboutPage';
import { CategoryPage } from '../pages/public/CategoryPage';
import { TagPage } from '../pages/public/TagPage';
import { SearchPage } from '../pages/public/SearchPage';
import { LoginPage } from '../pages/public/LoginPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { ArticleManagePage } from '../pages/admin/ArticleManagePage';
import { ArticleEditPage } from '../pages/admin/ArticleEditPage';
import { CategoryManagePage } from '../pages/admin/CategoryManagePage';
import { TagManagePage } from '../pages/admin/TagManagePage';
import { CommentManagePage } from '../pages/admin/CommentManagePage';
import { SettingsPage } from '../pages/admin/SettingsPage';

// 路由保护组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// 公共路由
const publicRoutes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/post/:id', element: <PostPage /> },
  { path: '/categories', element: <CategoriesPage /> },
  { path: '/category/:id', element: <CategoryPage /> },
  { path: '/tags', element: <TagsPage /> },
  { path: '/tag/:id', element: <TagPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/search', element: <SearchPage /> },
];

// 管理员路由
const adminRoutes: RouteObject[] = [
  { path: '/admin', element: <AdminPage /> },
  { path: '/admin/articles', element: <ArticleManagePage /> },
  { path: '/admin/articles/create', element: <ArticleEditPage /> },
  { path: '/admin/articles/:id/edit', element: <ArticleEditPage /> },
  { path: '/admin/categories', element: <CategoryManagePage /> },
  { path: '/admin/tags', element: <TagManagePage /> },
  { path: '/admin/comments', element: <CommentManagePage /> },
  { path: '/admin/settings', element: <SettingsPage /> },
];

// 所有路由
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      ...publicRoutes,
      ...adminRoutes.map(route => ({
        ...route,
        element: (
          <ProtectedRoute>
            {route.element}
          </ProtectedRoute>
        ),
      })),
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
