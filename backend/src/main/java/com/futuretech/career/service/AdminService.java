package com.futuretech.career.service;

import com.futuretech.career.dto.DashboardStats;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.exception.ResourceNotFoundException;
import com.futuretech.career.model.Feedback;
import com.futuretech.career.model.Inquiry;
import com.futuretech.career.model.Testimonial;
import com.futuretech.career.repository.FeedbackRepository;
import com.futuretech.career.repository.InquiryRepository;
import com.futuretech.career.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final InquiryRepository inquiryRepository;
    private final FeedbackRepository feedbackRepository;
    private final TestimonialRepository testimonialRepository;
    
    public DashboardStats getDashboardStats() {
        long totalInquiries = inquiryRepository.count();
        long unreadInquiries = inquiryRepository.countByIsRead(false);
        long pendingFeedback = feedbackRepository.countByStatus("pending");
        long activeTestimonials = testimonialRepository.countByIsActive(true);
        
        return new DashboardStats(
                totalInquiries,
                unreadInquiries,
                pendingFeedback,
                activeTestimonials,
                LocalDateTime.now()
        );
    }
    
    public PaginationResponse<Inquiry> getAllInquiries(int page, int limit, Boolean isRead) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        
        Page<Inquiry> inquiryPage;
        if (isRead != null) {
            inquiryPage = inquiryRepository.findByIsRead(isRead, pageRequest);
        } else {
            inquiryPage = inquiryRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        
        return new PaginationResponse<>(
                inquiryPage.getContent(),
                inquiryPage.getNumber(),
                inquiryPage.getSize(),
                inquiryPage.getTotalElements(),
                inquiryPage.getTotalPages()
        );
    }
    
    public Inquiry markInquiryAsRead(String id, boolean isRead) {
        if (id == null) {
            throw new IllegalArgumentException("Inquiry ID cannot be null");
        }
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found"));
        
        inquiry.setIsRead(isRead);
        return inquiryRepository.save(inquiry);
    }
    
    public void deleteInquiry(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Inquiry ID cannot be null");
        }
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found"));
        
        if (inquiry != null) {
            inquiryRepository.delete(inquiry);
        }
    }
    
    public PaginationResponse<Feedback> getAllFeedback(int page, int limit, String status) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        
        Page<Feedback> feedbackPage;
        if (status != null) {
            feedbackPage = feedbackRepository.findByStatus(status, pageRequest);
        } else {
            feedbackPage = feedbackRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        
        return new PaginationResponse<>(
                feedbackPage.getContent(),
                feedbackPage.getNumber(),
                feedbackPage.getSize(),
                feedbackPage.getTotalElements(),
                feedbackPage.getTotalPages()
        );
    }
    
    @Transactional
    public Testimonial approveFeedback(String id, String role) {
        if (id == null) {
            throw new IllegalArgumentException("Feedback ID cannot be null");
        }
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));
        
        // Update feedback status
        feedback.setStatus("approved");
        feedbackRepository.save(feedback);
        
        // Create testimonial
        Testimonial testimonial = new Testimonial();
        testimonial.setFeedbackId(feedback.getId());
        testimonial.setName(feedback.getName());
        testimonial.setEmail(feedback.getEmail());
        testimonial.setRating(feedback.getRating());
        testimonial.setMessage(feedback.getFeedback());
        testimonial.setRole(role);
        testimonial.setIsActive(true);
        
        return testimonialRepository.save(testimonial);
    }
    
    public Feedback rejectFeedback(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Feedback ID cannot be null");
        }
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));
        
        feedback.setStatus("rejected");
        return feedbackRepository.save(feedback);
    }
    
    public PaginationResponse<Testimonial> getAllTestimonials(int page, int limit, Boolean isActive) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        
        Page<Testimonial> testimonialPage;
        if (isActive != null) {
            testimonialPage = testimonialRepository.findByIsActive(isActive, pageRequest);
        } else {
            testimonialPage = testimonialRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        
        return new PaginationResponse<>(
                testimonialPage.getContent(),
                testimonialPage.getNumber(),
                testimonialPage.getSize(),
                testimonialPage.getTotalElements(),
                testimonialPage.getTotalPages()
        );
    }
}
