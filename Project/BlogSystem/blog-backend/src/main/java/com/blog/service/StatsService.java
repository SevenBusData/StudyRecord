package com.blog.service;

import java.util.Map;

public interface StatsService {
    /**
     * 获取核心统计数据
     * @return 核心统计数据
     */
    Map<String, Object> getCoreStats();

    /**
     * 获取阅读量统计
     * @return 阅读量统计数据
     */
    Map<String, Object> getViewsStats();

    /**
     * 获取文章分类统计
     * @return 文章分类统计数据
     */
    Map<String, Object> getCategoriesStats();

    /**
     * 获取热门文章
     * @return 热门文章数据
     */
    Map<String, Object> getPopularArticles();
}