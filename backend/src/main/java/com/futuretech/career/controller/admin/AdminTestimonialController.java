package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.dto.TestimonialRequest;
import com.futuretech.career.model.Testimonial;
import com.futuretech.career.service.TestimonialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/testimonials")
@RequiredArgsConstructor
public class AdminTestimonialController {
    
    private final TestimonialService testimonialService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<Testimonial>>> getAllTestimonials(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Testimonial> testimonialPage = testimonialService.getAllTestimonials(page, size);
        
        PaginationResponse<Testimonial> response = new PaginationResponse<>(
                testimonialPage.getContent(),
                testimonialPage.getNumber(),
                testimonialPage.getSize(),
                testimonialPage.getTotalElements(),
                testimonialPage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Testimonial>> getTestimonialById(@PathVariable String id) {
        Testimonial testimonial = testimonialService.getTestimonialById(id);
        return ResponseEntity.ok(ApiResponse.success(testimonial));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Testimonial>> createTestimonial(@Valid @RequestBody TestimonialRequest request) {
        Testimonial testimonial = testimonialService.createTestimonial(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(testimonial));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Testimonial>> updateTestimonial(
            @PathVariable String id,
            @Valid @RequestBody TestimonialRequest request) {
        
        Testimonial testimonial = testimonialService.updateTestimonial(id, request);
        return ResponseEntity.ok(ApiResponse.success(testimonial));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTestimonial(@PathVariable String id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Testimonial>> toggleTestimonialStatus(@PathVariable String id) {
        Testimonial testimonial = testimonialService.toggleTestimonialStatus(id);
        return ResponseEntity.ok(ApiResponse.success(testimonial));
    }
}
