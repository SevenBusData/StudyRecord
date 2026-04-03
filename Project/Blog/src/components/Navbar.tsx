import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md'
          : 'bg-white dark:bg-gray-900 shadow-sm'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 group">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-500 dark:to-amber-700 transition-all duration-300 group-hover:scale-105">
                My Blog
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300 relative group/link"
            >
              首页
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 dark:bg-amber-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300 relative group/link"
            >
              分类
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 dark:bg-amber-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link
              to="/tags"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300 relative group/link"
            >
              标签
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 dark:bg-amber-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link
              to="/resources"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300 relative group/link"
            >
              资源
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 dark:bg-amber-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300 relative group/link"
            >
              关于
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 dark:bg-amber-500 transition-all duration-300 group-hover/link:w-full" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6 transition-transform duration-300 transform rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[70vh] overflow-y-auto">
            <Link
              to="/"
              className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              分类
            </Link>
            <Link
              to="/tags"
              className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              标签
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              资源
            </Link>
            <Link
              to="/about"
              className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              关于
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
