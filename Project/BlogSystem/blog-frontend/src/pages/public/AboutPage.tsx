import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Me</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Your Name</h2>
              <p className="text-gray-600">Web Developer & Blogger</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            Hello! I'm a web developer passionate about creating beautiful, functional websites and
            sharing knowledge through my blog. With years of experience in front-end and back-end
            development, I enjoy exploring new technologies and best practices.
          </p>

          <p className="text-gray-700 mb-6">
            On this blog, you'll find articles about web development, programming tips, and
            personal reflections. My goal is to provide valuable content that helps developers of
            all levels improve their skills.
          </p>

          <div className="flex space-x-4">
            <a
              href="https://github.com/yourusername"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/yourusername"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Blog</h2>
          <p className="text-gray-700 mb-6">
            This blog is built with React, TypeScript, and Vite, featuring a clean design and
            responsive layout. It supports markdown content, category management, and tag filtering.
            The backend is powered by Spring Boot and MySQL.
          </p>
          <p className="text-gray-700">
            Thank you for visiting! I hope you find the content useful and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};
