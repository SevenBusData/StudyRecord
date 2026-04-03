```
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
```

## Project Overview

A modern React-based blog application with TypeScript and Vite, featuring:
- Blog post management with categories and tags
- Resource/document management
- Dark/light theme support
- Toast notifications
- Responsive design using Tailwind CSS

## Development Commands

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## Code Architecture

### Technology Stack
- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering
- **Remark GFM** - GitHub Flavored Markdown support

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── BlogList.tsx
│   ├── BlogCard.tsx
│   ├── SearchBar.tsx
│   ├── HeroSection.tsx
│   ├── FeaturedPosts.tsx
│   ├── AuthorProfile.tsx
│   └── CategoryTagSection.tsx
├── context/             # React context providers
│   └── ToastContext.tsx
├── data/                # Static data sources
│   └── blogPosts.ts
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── PostPage.tsx
│   ├── CategoriesPage.tsx
│   ├── CategoryPage.tsx
│   ├── TagsPage.tsx
│   ├── TagPage.tsx
│   ├── AboutPage.tsx
│   ├── ResourcesPage.tsx
│   └── DocumentViewPage.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Root component with routing
└── main.tsx             # Entry point
```

### Key Features

#### Routing Structure
The app uses React Router with the following routes:
- `/` - Home page with featured posts
- `/post/:id` - Blog post detail view
- `/categories` - All categories list
- `/category/:slug` - Posts by category
- `/tags` - All tags list
- `/tag/:slug` - Posts by tag
- `/about` - About page
- `/resources` - Resources/document library
- `/resources/document/:id` - Document viewer

#### Context API
- **ToastContext** - Global notification system with auto-hide functionality (3 seconds)

#### Data Management
Blog posts are stored as static data in `src/data/blogPosts.ts` with the following structure:
- Post metadata (title, excerpt, date, author, read time, category, tags)
- Markdown content for rendering
- Featured images

#### Styling
Tailwind CSS is configured with dark mode support. The app uses:
- `bg-gray-50` / `bg-gray-900` - Background colors
- Responsive grid and flex layouts
- Animation classes for transitions

## Configuration Files

### vite.config.ts
- Base path: `/StudyRecord` (for GitHub Pages deployment)
- Port: 5173

### package.json
- Homepage: `https://sevenbusdata.github.io/StudyRecord`
- Type: ES module

## Browser Support

Modern browsers with ES module support. Built with Vite's default target configuration.
