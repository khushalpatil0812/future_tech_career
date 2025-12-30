package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.model.Inquiry;
import com.futuretech.career.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {
    
    private final InquiryService inquiryService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createInquiry(@Valid @RequestBody Inquiry inquiry) {
        inquiryService.createInquiry(inquiry);
        return ResponseEntity.ok(ApiResponse.success(
                "Thank you! We'll contact you within 24 hours.", 
                null
        ));
    }
}
