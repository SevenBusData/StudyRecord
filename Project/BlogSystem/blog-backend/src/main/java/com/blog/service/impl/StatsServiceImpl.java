package com.blog.service.impl;

import com.blog.entity.Article;
import com.blog.entity.Category;
import com.blog.mapper.ArticleMapper;
import com.blog.mapper.CategoryMapper;
import com.blog.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatsServiceImpl implements StatsService {

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public Map<String, Object> getCoreStats() {
        Map<String, Object> stats = new HashMap<>();
        // 文章总数
        Long articleCount = articleMapper.selectCount(null);
        // 分类总数
        Long categoryCount = categoryMapper.selectCount(null);
        // 计算总阅读量
        List<Article> articles = articleMapper.selectList(null);
        int totalViews = articles.stream().mapToInt(Article::getViews).sum();
        // 计算总点赞数
        int totalLikes = articles.stream().mapToInt(Article::getLikes).sum();

        stats.put("articleCount", articleCount);
        stats.put("categoryCount", categoryCount);
        stats.put("totalViews", totalViews);
        stats.put("totalLikes", totalLikes);

        return stats;
    }

    @Override
    public Map<String, Object> getViewsStats() {
        Map<String, Object> stats = new HashMap<>();
        // 获取所有文章的阅读量
        List<Article> articles = articleMapper.selectList(null);
        Map<Long, Integer> articleViews = new HashMap<>();
        for (Article article : articles) {
            articleViews.put(article.getId(), article.getViews());
        }

        stats.put("articleViews", articleViews);

        return stats;
    }

    @Override
    public Map<String, Object> getCategoriesStats() {
        Map<String, Object> stats = new HashMap<>();
        // 获取所有分类
        List<Category> categories = categoryMapper.selectList(null);
        Map<String, Integer> categoryArticleCount = new HashMap<>();
        for (Category category : categories) {
            categoryArticleCount.put(category.getName(), category.getArticleCount());
        }

        stats.put("categoryArticleCount", categoryArticleCount);

        return stats;
    }

    @Override
    public Map<String, Object> getPopularArticles() {
        Map<String, Object> stats = new HashMap<>();
        // 获取阅读量最高的前 10 篇文章
        List<Article> articles = articleMapper.selectList(null);
        articles.sort((a1, a2) -> a2.getViews() - a1.getViews());
        List<Article> popularArticles = articles.stream().limit(10).toList();

        stats.put("popularArticles", popularArticles);

        return stats;
    }
}