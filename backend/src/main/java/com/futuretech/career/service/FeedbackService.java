package com.futuretech.career.service;

import com.futuretech.career.exception.BadRequestException;
import com.futuretech.career.model.Feedback;
import com.futuretech.career.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    
    public Feedback createFeedback(Feedback feedback) {
        if (!feedback.getConsent()) {
            throw new BadRequestException("Consent is required to submit feedback");
        }
        
        feedback.setStatus("pending");
        return feedbackRepository.save(feedback);
    }
}
