package com.blog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.entity.Comment;
import com.blog.mapper.CommentMapper;
import com.blog.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {
    @Override
    public List<Comment> findByArticleId(Long articleId) {
        return lambdaQuery()
                .eq(Comment::getArticleId, articleId)
                .eq(Comment::getDeleted, 0)
                .orderByDesc(Comment::getCreatedAt)
                .list();
    }
}
