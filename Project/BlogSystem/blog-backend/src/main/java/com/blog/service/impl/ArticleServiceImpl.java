package com.blog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.entity.Article;
import com.blog.mapper.ArticleMapper;
import com.blog.service.ArticleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Override
    public List<Article> findAllPublished() {
        return lambdaQuery()
                .eq(Article::getStatus, "PUBLISHED")
                .orderByDesc(Article::getCreatedAt)
                .list();
    }

    @Override
    public List<Article> findByCategoryId(Long categoryId) {
        return lambdaQuery()
                .eq(Article::getStatus, "PUBLISHED")
                .eq(Article::getCategoryId, categoryId)
                .orderByDesc(Article::getCreatedAt)
                .list();
    }

    @Override
    public List<Article> findByTagId(Long tagId) {
        return lambdaQuery()
                .eq(Article::getStatus, "PUBLISHED")
                .eq(Article::getCategoryId, tagId)
                .orderByDesc(Article::getCreatedAt)
                .list();
    }

    @Override
    public List<Article> search(String keyword) {
        return lambdaQuery()
                .eq(Article::getStatus, "PUBLISHED")
                .and(q -> q.like(Article::getTitle, keyword).or().like(Article::getContent, keyword))
                .orderByDesc(Article::getCreatedAt)
                .list();
    }
}
