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
    public ResponseEntity<ApiResponse<PaginationResponse<Page<Inquiry>>>> getAllInquiries(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) Boolean status) {
        
        Boolean isRead = status != null && status ? true : null;
        PaginationResponse<Page<Inquiry>> response = adminService.getAllInquiries(page, limit, isRead);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PatchMapping("/inquiries/{id}/read")
    public ResponseEntity<ApiResponse<String>> markInquiryAsRead(
            @PathVariable String id,
            @RequestBody Map<String, Boolean> body) {
        
        boolean isRead = body.getOrDefault("isRead", true);
        adminService.markInquiryAsRead(id, isRead);
        return ResponseEntity.ok(ApiResponse.success("Inquiry marked as " + (isRead ? "read" : "unread"), null));
    }
    
    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<ApiResponse<String>> deleteInquiry(@PathVariable String id) {
        adminService.deleteInquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Inquiry deleted successfully", null));
    }
    
    // Feedback Management
    @GetMapping("/feedback")
    public ResponseEntity<ApiResponse<PaginationResponse<Page<Feedback>>>> getAllFeedback(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String status) {
        
        PaginationResponse<Page<Feedback>> response = adminService.getAllFeedback(page, limit, status);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PostMapping("/feedback/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveFeedback(
            @PathVariable String id,
            @RequestBody(required = false) Map<String, String> body) {
        
        String role = body != null ? body.get("role") : null;
        adminService.approveFeedback(id, role);
        return ResponseEntity.ok(ApiResponse.success("Feedback approved and added to testimonials", null));
    }
    
    @PostMapping("/feedback/{id}/reject")
    public ResponseEntity<ApiResponse<String>> rejectFeedback(@PathVariable String id) {
        adminService.rejectFeedback(id);
        return ResponseEntity.ok(ApiResponse.success("Feedback rejected", null));
    }
    
    // Testimonial Management
    @GetMapping("/testimonials")
    public ResponseEntity<ApiResponse<PaginationResponse<Page<Testimonial>>>> getAllTestimonials(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) Boolean status) {
        
        PaginationResponse<Page<Testimonial>> response = adminService.getAllTestimonials(page, limit, status);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @PatchMapping("/testimonials/{id}/toggle")
    public ResponseEntity<ApiResponse<String>> toggleTestimonialStatus(
            @PathVariable String id,
            @RequestBody Map<String, Boolean> body) {
        
        Testimonial testimonial = new Testimonial();
        testimonial.setIsActive(body.get("isActive"));
        testimonialService.updateTestimonial(id, testimonial);
        return ResponseEntity.ok(ApiResponse.success("Testimonial status updated", null));
    }
    
    @PatchMapping("/testimonials/{id}")
    public ResponseEntity<ApiResponse<String>> updateTestimonial(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        
        Testimonial testimonial = new Testimonial();
        testimonial.setRole(body.get("role"));
        testimonialService.updateTestimonial(id, testimonial);
        return ResponseEntity.ok(ApiResponse.success("Testimonial updated", null));
    }
    
    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTestimonial(@PathVariable String id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.ok(ApiResponse.success("Testimonial deleted", null));
    }
    
    // Content Management
    @PutMapping("/content/{section}")
    public ResponseEntity<ApiResponse<String>> updateContent(
            @PathVariable String section,
            @RequestBody Map<String, String> body) {
        
        contentService.updateContent(section, body.get("content"));
        return ResponseEntity.ok(ApiResponse.success("Content updated successfully", null));
    }
    
    // SEO Management
    @PutMapping("/seo/{page}")
    public ResponseEntity<ApiResponse<String>> updateSEO(
            @PathVariable String page,
            @Valid @RequestBody SEO seoUpdates) {
        
        seoService.updateSEO(page, seoUpdates);
        return ResponseEntity.ok(ApiResponse.success("SEO metadata updated", null));
    }
}
