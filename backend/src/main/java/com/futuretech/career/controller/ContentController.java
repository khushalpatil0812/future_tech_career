package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.model.Content;
import com.futuretech.career.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {
    
    private final ContentService contentService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<java.util.List<Content>>> getAllContent() {
        java.util.List<Content> content = contentService.getAllContent();
        return ResponseEntity.ok(ApiResponse.success(content));
    }
    
    @GetMapping("/{section}")
    public ResponseEntity<ApiResponse<Content>> getContentBySection(@PathVariable String section) {
        Content content = contentService.getContentBySection(section);
        return ResponseEntity.ok(ApiResponse.success(content));
    }
}
