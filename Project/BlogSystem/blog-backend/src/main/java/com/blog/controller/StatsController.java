package com.blog.controller;

import com.blog.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
@Tag(name = "Statistics", description = "统计数据接口")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/core")
    @Operation(summary = "获取核心统计数据")
    public ResponseEntity<?> getCoreStats() {
        return ResponseEntity.ok(statsService.getCoreStats());
    }

    @GetMapping("/views")
    @Operation(summary = "获取阅读量统计")
    public ResponseEntity<?> getViewsStats() {
        return ResponseEntity.ok(statsService.getViewsStats());
    }

    @GetMapping("/categories")
    @Operation(summary = "获取文章分类统计")
    public ResponseEntity<?> getCategoriesStats() {
        return ResponseEntity.ok(statsService.getCategoriesStats());
    }

    @GetMapping("/popular")
    @Operation(summary = "获取热门文章")
    public ResponseEntity<?> getPopularArticles() {
        return ResponseEntity.ok(statsService.getPopularArticles());
    }
}
