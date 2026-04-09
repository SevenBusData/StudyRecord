package com.blog.controller;

import com.blog.entity.Comment;
import com.blog.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
@Tag(name = "Comments", description = "评论管理接口")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    @Operation(summary = "获取所有评论")
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.list();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/article/{articleId}")
    @Operation(summary = "获取文章评论")
    public ResponseEntity<List<Comment>> getCommentsByArticleId(@PathVariable Long articleId) {
        List<Comment> comments = commentService.findByArticleId(articleId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取评论详情")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Comment comment = commentService.getById(id);
        return comment != null ? ResponseEntity.ok(comment) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "创建评论")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        commentService.save(comment);
        return ResponseEntity.ok(comment);
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新评论")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        Comment existingComment = commentService.getById(id);
        if (existingComment == null) {
            return ResponseEntity.notFound().build();
        }
        comment.setId(id);
        commentService.updateById(comment);
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除评论")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (!commentService.removeById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
