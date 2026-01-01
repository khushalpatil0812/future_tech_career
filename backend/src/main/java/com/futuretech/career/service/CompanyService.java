package com.futuretech.career.service;

import com.futuretech.career.dto.CompanyRequest;
import com.futuretech.career.model.Company;
import com.futuretech.career.repository.CompanyRepository;
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
public class CompanyService {
    
    private final CompanyRepository companyRepository;
    
    public List<Company> getActiveCompanies() {
        return companyRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
    }
    
    public Page<Company> getAllCompanies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return companyRepository.findAll(pageable);
    }
    
    public Company getCompanyById(String id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }
    
    @Transactional
    public Company createCompany(CompanyRequest request) {
        Company company = new Company();
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setLogoUrl(request.getLogoUrl());
        company.setWebsiteUrl(request.getWebsiteUrl());
        company.setIndustry(request.getIndustry());
        company.setLocation(request.getLocation());
        company.setIsActive(request.getIsActive());
        company.setDisplayOrder(request.getDisplayOrder());
        
        Company saved = companyRepository.save(company);
        log.info("Created company: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public Company updateCompany(String id, CompanyRequest request) {
        Company company = getCompanyById(id);
        
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setLogoUrl(request.getLogoUrl());
        company.setWebsiteUrl(request.getWebsiteUrl());
        company.setIndustry(request.getIndustry());
        company.setLocation(request.getLocation());
        company.setIsActive(request.getIsActive());
        company.setDisplayOrder(request.getDisplayOrder());
        
        Company updated = companyRepository.save(company);
        log.info("Updated company: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public void deleteCompany(String id) {
        Company company = getCompanyById(id);
        companyRepository.delete(company);
        log.info("Deleted company: {}", id);
    }
    
    @Transactional
    public Company toggleCompanyStatus(String id) {
        Company company = getCompanyById(id);
        company.setIsActive(!company.getIsActive());
        return companyRepository.save(company);
    }
}
