-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blog;

-- 创建用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `bio` varchar(500) DEFAULT NULL COMMENT '个人简介',
  `role` varchar(20) NOT NULL DEFAULT 'USER' COMMENT '用户角色',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标志',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 创建分类表
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `slug` varchar(100) NOT NULL COMMENT '分类别名',
  `description` varchar(500) DEFAULT NULL COMMENT '分类描述',
  `article_count` int(11) NOT NULL DEFAULT '0' COMMENT '文章数量',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标志',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分类表';

-- 创建标签表
CREATE TABLE IF NOT EXISTS `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '标签名称',
  `slug` varchar(100) NOT NULL COMMENT '标签别名',
  `article_count` int(11) NOT NULL DEFAULT '0' COMMENT '文章数量',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标志',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签表';

-- 创建文章表
CREATE TABLE IF NOT EXISTS `article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL COMMENT '文章标题',
  `content` longtext NOT NULL COMMENT '文章内容',
  `summary` varchar(500) DEFAULT NULL COMMENT '文章摘要',
  `cover_image` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `views` int(11) NOT NULL DEFAULT '0' COMMENT '阅读量',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `status` varchar(20) NOT NULL DEFAULT 'DRAFT' COMMENT '文章状态',
  `category_id` bigint(20) DEFAULT NULL COMMENT '分类ID',
  `user_id` bigint(20) NOT NULL COMMENT '作者ID',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标志',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

-- 创建文章标签关联表
CREATE TABLE IF NOT EXISTS `article_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `article_id` bigint(20) NOT NULL COMMENT '文章ID',
  `tag_id` bigint(20) NOT NULL COMMENT '标签ID',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标志',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_article_tag` (`article_id`,`tag_id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章标签关联表';

-- 创建评论表
CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL COMMENT '评论内容',
  `user_id` bigint(20) NOT NULL COMMENT '评论者ID',
  `article_id` bigint(20) NOT NULL COMMENT '文章ID',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父评论ID',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除标志',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- 插入初始数据（如果用户不存在）
INSERT INTO `user` (`username`, `password`, `email`, `avatar`, `bio`, `role`)
SELECT 'admin', '$2a$10$j4hX0bs527vs/p3.jwRQ5Oa3ZPrJQWygXT3sN04m97w/hEC4aQXTi', 'admin@example.com', NULL, '系统管理员', 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM `user` WHERE `username` = 'admin');

-- 插入分类数据（如果分类不存在）
INSERT INTO `category` (`name`, `slug`, `description`)
SELECT '技术', 'technology', '技术相关文章'
WHERE NOT EXISTS (SELECT 1 FROM `category` WHERE `slug` = 'technology');

INSERT INTO `category` (`name`, `slug`, `description`)
SELECT '生活', 'life', '生活相关文章'
WHERE NOT EXISTS (SELECT 1 FROM `category` WHERE `slug` = 'life');

INSERT INTO `category` (`name`, `slug`, `description`)
SELECT '旅行', 'travel', '旅行相关文章'
WHERE NOT EXISTS (SELECT 1 FROM `category` WHERE `slug` = 'travel');

-- 插入标签数据（如果标签不存在）
INSERT INTO `tag` (`name`, `slug`)
SELECT 'Java', 'java'
WHERE NOT EXISTS (SELECT 1 FROM `tag` WHERE `slug` = 'java');

INSERT INTO `tag` (`name`, `slug`)
SELECT 'Spring Boot', 'spring-boot'
WHERE NOT EXISTS (SELECT 1 FROM `tag` WHERE `slug` = 'spring-boot');

INSERT INTO `tag` (`name`, `slug`)
SELECT 'MySQL', 'mysql'
WHERE NOT EXISTS (SELECT 1 FROM `tag` WHERE `slug` = 'mysql');

-- 插入文章数据（如果文章不存在）
INSERT INTO `article` (`title`, `content`, `summary`, `cover_image`, `status`, `category_id`, `user_id`)
SELECT 'Spring Boot 入门指南', 'Spring Boot 是一个用于快速开发 Java 应用程序的框架...', 'Spring Boot 入门指南', 'https://example.com/cover1.jpg', 'PUBLISHED', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM `article` WHERE `title` = 'Spring Boot 入门指南');

INSERT INTO `article` (`title`, `content`, `summary`, `cover_image`, `status`, `category_id`, `user_id`)
SELECT 'Java 基础教程', 'Java 是一种面向对象的编程语言...', 'Java 基础教程', 'https://example.com/cover2.jpg', 'PUBLISHED', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM `article` WHERE `title` = 'Java 基础教程');

INSERT INTO `article` (`title`, `content`, `summary`, `cover_image`, `status`, `category_id`, `user_id`)
SELECT 'MySQL 数据库设计', '数据库设计是软件开发中的重要环节...', 'MySQL 数据库设计', 'https://example.com/cover3.jpg', 'PUBLISHED', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM `article` WHERE `title` = 'MySQL 数据库设计');

-- 插入评论数据（如果评论不存在）
INSERT INTO `comment` (`content`, `user_id`, `article_id`)
SELECT '这是一篇很好的文章', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM `comment` WHERE `content` = '这是一篇很好的文章' AND `article_id` = 1);

INSERT INTO `comment` (`content`, `user_id`, `article_id`)
SELECT '感谢作者分享', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM `comment` WHERE `content` = '感谢作者分享' AND `article_id` = 1);

INSERT INTO `comment` (`content`, `user_id`, `article_id`)
SELECT '学习到了很多', 1, 2
WHERE NOT EXISTS (SELECT 1 FROM `comment` WHERE `content` = '学习到了很多' AND `article_id` = 2);