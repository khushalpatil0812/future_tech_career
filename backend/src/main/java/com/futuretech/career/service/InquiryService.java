package com.futuretech.career.service;

import com.futuretech.career.model.Inquiry;
import com.futuretech.career.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InquiryService {
    
    private final InquiryRepository inquiryRepository;
    
    public Inquiry createInquiry(Inquiry inquiry) {
        inquiry.setIsRead(false);
        return inquiryRepository.save(inquiry);
    }
}
