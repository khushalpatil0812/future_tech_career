package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.model.Feedback;
import com.futuretech.career.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createFeedback(@Valid @RequestBody Feedback feedback) {
        feedbackService.createFeedback(feedback);
        return ResponseEntity.ok(ApiResponse.success(
                "Thank you! Your feedback is under review.", 
                null
        ));
    }
}
