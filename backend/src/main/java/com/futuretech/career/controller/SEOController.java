package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.model.SEO;
import com.futuretech.career.service.SEOService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seo")
@RequiredArgsConstructor
public class SEOController {
    
    private final SEOService seoService;
    
    @GetMapping("/{page}")
    public ResponseEntity<ApiResponse<SEO>> getSEOByPage(@PathVariable String page) {
        SEO seo = seoService.getSEOByPage(page);
        return ResponseEntity.ok(ApiResponse.success(seo));
    }
}
