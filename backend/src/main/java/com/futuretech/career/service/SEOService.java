package com.futuretech.career.service;

import com.futuretech.career.exception.ResourceNotFoundException;
import com.futuretech.career.model.SEO;
import com.futuretech.career.repository.SEORepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SEOService {
    
    private final SEORepository seoRepository;
    
    public SEO getSEOByPage(String page) {
        return seoRepository.findByPage(page)
                .orElseThrow(() -> new ResourceNotFoundException("SEO metadata not found for page: " + page));
    }
    
    public SEO updateSEO(String page, SEO updates) {
        SEO seo = seoRepository.findByPage(page)
                .orElseThrow(() -> new ResourceNotFoundException("SEO metadata not found for page: " + page));
        
        if (updates.getTitle() != null) {
            seo.setTitle(updates.getTitle());
        }
        if (updates.getDescription() != null) {
            seo.setDescription(updates.getDescription());
        }
        if (updates.getKeywords() != null) {
            seo.setKeywords(updates.getKeywords());
        }
        if (updates.getOgImage() != null) {
            seo.setOgImage(updates.getOgImage());
        }
        
        return seoRepository.save(seo);
    }
}
