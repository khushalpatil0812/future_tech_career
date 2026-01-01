package com.futuretech.career.service;

import com.futuretech.career.dto.PartnerRequest;
import com.futuretech.career.model.Partner;
import com.futuretech.career.repository.PartnerRepository;
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
public class PartnerService {
    
    private final PartnerRepository partnerRepository;
    
    public List<Partner> getActivePartners() {
        return partnerRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
    }
    
    public Page<Partner> getAllPartners(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return partnerRepository.findAll(pageable);
    }
    
    public Partner getPartnerById(String id) {
        return partnerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));
    }
    
    @Transactional
    public Partner createPartner(PartnerRequest request) {
        Partner partner = new Partner();
        partner.setName(request.getName());
        partner.setLogoUrl(request.getLogoUrl());
        partner.setWebsiteUrl(request.getWebsiteUrl());
        partner.setDescription(request.getDescription());
        partner.setIsActive(request.getIsActive());
        partner.setDisplayOrder(request.getDisplayOrder());
        
        Partner saved = partnerRepository.save(partner);
        log.info("Created partner: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public Partner updatePartner(String id, PartnerRequest request) {
        Partner partner = getPartnerById(id);
        
        partner.setName(request.getName());
        partner.setLogoUrl(request.getLogoUrl());
        partner.setWebsiteUrl(request.getWebsiteUrl());
        partner.setDescription(request.getDescription());
        partner.setIsActive(request.getIsActive());
        partner.setDisplayOrder(request.getDisplayOrder());
        
        Partner updated = partnerRepository.save(partner);
        log.info("Updated partner: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public void deletePartner(String id) {
        Partner partner = getPartnerById(id);
        partnerRepository.delete(partner);
        log.info("Deleted partner: {}", id);
    }
    
    @Transactional
    public Partner togglePartnerStatus(String id) {
        Partner partner = getPartnerById(id);
        partner.setIsActive(!partner.getIsActive());
        return partnerRepository.save(partner);
    }
}
