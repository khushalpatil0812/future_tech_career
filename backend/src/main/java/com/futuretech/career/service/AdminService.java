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
    
    public PaginationResponse<Page<Inquiry>> getAllInquiries(int page, int limit, Boolean isRead) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        
        Page<Inquiry> inquiries;
        if (isRead != null) {
            inquiries = inquiryRepository.findByIsRead(isRead, pageRequest);
        } else {
            inquiries = inquiryRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        
        PaginationResponse.PaginationInfo paginationInfo = new PaginationResponse.PaginationInfo(
                inquiries.getTotalElements(),
                page,
                limit,
                inquiries.getTotalPages()
        );
        
        return new PaginationResponse<>(inquiries, paginationInfo);
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
    
    public PaginationResponse<Page<Feedback>> getAllFeedback(int page, int limit, String status) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        
        Page<Feedback> feedback;
        if (status != null && !status.isEmpty()) {
            feedback = feedbackRepository.findByStatus(status, pageRequest);
        } else {
            feedback = feedbackRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        
        PaginationResponse.PaginationInfo paginationInfo = new PaginationResponse.PaginationInfo(
                feedback.getTotalElements(),
                page,
                limit,
                feedback.getTotalPages()
        );
        
        return new PaginationResponse<>(feedback, paginationInfo);
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
    
    public PaginationResponse<Page<Testimonial>> getAllTestimonials(int page, int limit, Boolean isActive) {
        PageRequest pageRequest = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        
        Page<Testimonial> testimonials;
        if (isActive != null) {
            testimonials = testimonialRepository.findByIsActive(isActive, pageRequest);
        } else {
            testimonials = testimonialRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }
        
        PaginationResponse.PaginationInfo paginationInfo = new PaginationResponse.PaginationInfo(
                testimonials.getTotalElements(),
                page,
                limit,
                testimonials.getTotalPages()
        );
        
        return new PaginationResponse<>(testimonials, paginationInfo);
    }
}
