package com.futuretech.career.service;

import com.futuretech.career.exception.ResourceNotFoundException;
import com.futuretech.career.model.Content;
import com.futuretech.career.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContentService {
    
    private final ContentRepository contentRepository;
    
    public Content getContentBySection(String section) {
        return contentRepository.findBySection(section)
                .orElseThrow(() -> new ResourceNotFoundException("Content section not found: " + section));
    }
    
    public Content updateContent(String section, String content) {
        Content contentEntity = contentRepository.findBySection(section)
                .orElseThrow(() -> new ResourceNotFoundException("Content section not found: " + section));
        
        contentEntity.setContent(content);
        return contentRepository.save(contentEntity);
    }
}
