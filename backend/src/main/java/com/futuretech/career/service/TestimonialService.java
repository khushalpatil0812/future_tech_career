package com.futuretech.career.service;

import com.futuretech.career.exception.ResourceNotFoundException;
import com.futuretech.career.model.Testimonial;
import com.futuretech.career.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {
    
    private final TestimonialRepository testimonialRepository;
    
    public List<Testimonial> getActiveTestimonials(Integer limit) {
        if (limit != null && limit > 0) {
            return testimonialRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                    .stream()
                    .limit(limit)
                    .toList();
        }
        return testimonialRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }
    
    public Testimonial getTestimonialById(String id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found"));
    }
    
    public Testimonial updateTestimonial(String id, Testimonial updates) {
        Testimonial testimonial = getTestimonialById(id);
        
        if (updates.getRole() != null) {
            testimonial.setRole(updates.getRole());
        }
        if (updates.getIsActive() != null) {
            testimonial.setIsActive(updates.getIsActive());
        }
        
        return testimonialRepository.save(testimonial);
    }
    
    public void deleteTestimonial(String id) {
        Testimonial testimonial = getTestimonialById(id);
        testimonialRepository.delete(testimonial);
    }
}
