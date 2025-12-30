package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.model.Testimonial;
import com.futuretech.career.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {
    
    private final TestimonialService testimonialService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Testimonial>>> getActiveTestimonials(
            @RequestParam(required = false) Integer limit) {
        List<Testimonial> testimonials = testimonialService.getActiveTestimonials(limit);
        return ResponseEntity.ok(ApiResponse.success(testimonials));
    }
}
