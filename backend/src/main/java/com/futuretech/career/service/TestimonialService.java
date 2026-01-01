package com.futuretech.career.service;

import com.futuretech.career.dto.TestimonialRequest;
import com.futuretech.career.exception.ResourceNotFoundException;
import com.futuretech.career.model.Testimonial;
import com.futuretech.career.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TestimonialService {
    
    private final TestimonialRepository testimonialRepository;
    
    public List<Testimonial> getActiveTestimonials() {
        return testimonialRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }
    
    public List<Testimonial> getActiveTestimonials(Integer limit) {
        if (limit != null && limit > 0) {
            return testimonialRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                    .stream()
                    .limit(limit)
                    .toList();
        }
        return testimonialRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }
    
    public Page<Testimonial> getAllTestimonials(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return testimonialRepository.findAll(pageable);
    }
    
    public Testimonial getTestimonialById(String id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found"));
    }
    
    @Transactional
    public Testimonial createTestimonial(TestimonialRequest request) {
        Testimonial testimonial = new Testimonial();
        testimonial.setName(request.getName());
        testimonial.setPosition(request.getPosition());
        testimonial.setCompany(request.getCompany());
        testimonial.setContent(request.getContent());
        testimonial.setRating(request.getRating());
        testimonial.setAvatarUrl(request.getAvatarUrl());
        testimonial.setIsActive(request.getIsActive());
        testimonial.setDisplayOrder(request.getDisplayOrder());
        
        Testimonial saved = testimonialRepository.save(testimonial);
        log.info("Created testimonial: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public Testimonial updateTestimonial(String id, TestimonialRequest request) {
        Testimonial testimonial = getTestimonialById(id);
        
        testimonial.setName(request.getName());
        testimonial.setPosition(request.getPosition());
        testimonial.setCompany(request.getCompany());
        testimonial.setContent(request.getContent());
        testimonial.setRating(request.getRating());
        testimonial.setAvatarUrl(request.getAvatarUrl());
        testimonial.setIsActive(request.getIsActive());
        testimonial.setDisplayOrder(request.getDisplayOrder());
        
        Testimonial updated = testimonialRepository.save(testimonial);
        log.info("Updated testimonial: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public void deleteTestimonial(String id) {
        Testimonial testimonial = getTestimonialById(id);
        testimonialRepository.delete(testimonial);
        log.info("Deleted testimonial: {}", id);
    }
    
    @Transactional
    public Testimonial toggleTestimonialStatus(String id) {
        Testimonial testimonial = getTestimonialById(id);
        testimonial.setIsActive(!testimonial.getIsActive());
        return testimonialRepository.save(testimonial);
    }
}
