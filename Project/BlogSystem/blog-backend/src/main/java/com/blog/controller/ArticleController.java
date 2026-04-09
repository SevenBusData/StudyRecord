package com.blog.controller;

import com.blog.entity.Article;
import com.blog.entity.User;
import com.blog.service.ArticleService;
import com.blog.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "*")
@Tag(name = "Articles", description = "文章管理接口")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "获取所有文章")
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.list();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/public")
    @Operation(summary = "获取所有已发布文章")
    public ResponseEntity<List<Article>> getAllPublishedArticles() {
        List<Article> articles = articleService.findAllPublished();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取文章详情")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Article article = articleService.getById(id);
        return article != null ? ResponseEntity.ok(article) : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    @Operation(summary = "搜索文章")
    public ResponseEntity<List<Article>> searchArticles(@RequestParam String keyword) {
        List<Article> articles = articleService.search(keyword);
        return ResponseEntity.ok(articles);
    }

    @PostMapping
    @Operation(summary = "创建文章")
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        // 从当前认证的用户信息中获取 userId 字段
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            User user = userService.findByUsername(authentication.getName());
            if (user != null) {
                article.setUserId(user.getId());
            }
        }
        articleService.save(article);
        return ResponseEntity.ok(article);
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新文章")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        Article existingArticle = articleService.getById(id);
        if (existingArticle == null) {
            return ResponseEntity.notFound().build();
        }
        article.setId(id);
        articleService.updateById(article);
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除文章")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        if (!articleService.removeById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/import")
    @Operation(summary = "导入文章（MD文件）")
    public ResponseEntity<Article> importArticle(@RequestParam("file") MultipartFile file) {
        try {
            // 读取MD文件内容
            StringBuilder content = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    content.append(line).append("\n");
                }
            }

            // 创建文章对象
            Article article = new Article();
            article.setTitle(file.getOriginalFilename().replace(".md", ""));
            article.setContent(content.toString());
            article.setStatus("DRAFT");
            article.setViews(0);
            article.setLikes(0);

            // 获取当前用户ID
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String username = authentication.getName();
                User user = userService.findByUsername(username);
                if (user != null) {
                    article.setUserId(user.getId());
                }
            }

            // 保存文章
            articleService.save(article);

            return ResponseEntity.ok(article);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
