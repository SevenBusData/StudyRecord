package com.blog.service;

import com.blog.entity.Comment;
import com.baomidou.mybatisplus.extension.service.IService;
import java.util.List;

public interface CommentService extends IService<Comment> {
    List<Comment> findByArticleId(Long articleId);
}
