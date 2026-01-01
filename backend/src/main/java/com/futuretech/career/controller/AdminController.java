package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.DashboardStats;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.model.*;
import com.futuretech.career.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;
    private final TestimonialService testimonialService;
    private final ContentService contentService;
    private final SEOService seoService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardStats>> getDashboardStats() {
        DashboardStats stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
    
    // Inquiry Management
    @GetMapping("/inquiries")
    public ResponseEntity<ApiResponse<PaginationResponse<Inquiry>>> getAllInquiries(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) Boolean status) {
        
        Boolean isRead = status != null && status ? true : null;
        PaginationResponse<Inquiry> response = adminService.getAllInquiries(page, limit, isRead);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PatchMapping("/inquiries/{id}/read")
    public ResponseEntity<ApiResponse<String>> markInquiryAsRead(
            @PathVariable String id,
            @RequestBody Map<String, Boolean> body) {
        
        boolean isRead = body.getOrDefault("isRead", true);
        adminService.markInquiryAsRead(id, isRead);
        return ResponseEntity.ok(ApiResponse.success("Inquiry marked as " + (isRead ? "read" : "unread")));
    }
    
    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<ApiResponse<String>> deleteInquiry(@PathVariable String id) {
        adminService.deleteInquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Inquiry deleted successfully"));
    }
    
    // Feedback Management
    @GetMapping("/feedback")
    public ResponseEntity<ApiResponse<PaginationResponse<Feedback>>> getAllFeedback(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String status) {
        
        PaginationResponse<Feedback> response = adminService.getAllFeedback(page, limit, status);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PostMapping("/feedback/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveFeedback(
            @PathVariable String id,
            @RequestBody(required = false) Map<String, String> body) {
        
        String role = body != null ? body.get("role") : null;
        adminService.approveFeedback(id, role);
        return ResponseEntity.ok(ApiResponse.success("Feedback approved and added to testimonials"));
    }
    
    @PostMapping("/feedback/{id}/reject")
    public ResponseEntity<ApiResponse<String>> rejectFeedback(@PathVariable String id) {
        adminService.rejectFeedback(id);
        return ResponseEntity.ok(ApiResponse.success("Feedback rejected"));
    }
    
    // Content Management
    @PutMapping("/content/{section}")
    public ResponseEntity<ApiResponse<String>> updateContent(
            @PathVariable String section,
            @RequestBody Map<String, String> body) {
        
        contentService.updateContent(section, body.get("content"));
        return ResponseEntity.ok(ApiResponse.success("Content updated successfully"));
    }
    
    // SEO Management
    @PutMapping("/seo/{page}")
    public ResponseEntity<ApiResponse<String>> updateSEO(
            @PathVariable String page,
            @Valid @RequestBody SEO seoUpdates) {
        
        seoService.updateSEO(page, seoUpdates);
        return ResponseEntity.ok(ApiResponse.success("SEO metadata updated"));
    }
}
