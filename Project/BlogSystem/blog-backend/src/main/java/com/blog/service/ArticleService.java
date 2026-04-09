package com.blog.service;

import com.blog.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface ArticleService extends IService<Article> {

    List<Article> findAllPublished();

    List<Article> findByCategoryId(Long categoryId);

    List<Article> findByTagId(Long tagId);

    List<Article> search(String keyword);
}
