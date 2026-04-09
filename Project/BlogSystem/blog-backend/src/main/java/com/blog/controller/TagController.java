package com.blog.controller;

import com.blog.entity.Tag;
import com.blog.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins = "*")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tags", description = "标签管理接口")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    @Operation(summary = "获取所有标签")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.list();
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取标签详情")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Tag tag = tagService.getById(id);
        return tag != null ? ResponseEntity.ok(tag) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "创建标签")
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        tagService.save(tag);
        return ResponseEntity.ok(tag);
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新标签")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag tag) {
        Tag existingTag = tagService.getById(id);
        if (existingTag == null) {
            return ResponseEntity.notFound().build();
        }
        tag.setId(id);
        tagService.updateById(tag);
        return ResponseEntity.ok(tag);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除标签")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        if (!tagService.removeById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
