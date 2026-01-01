package com.futuretech.career.controller;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.model.Company;
import com.futuretech.career.model.Partner;
import com.futuretech.career.service.CompanyService;
import com.futuretech.career.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PublicController {
    
    private final CompanyService companyService;
    private final PartnerService partnerService;
    
    @GetMapping("/companies/active")
    public ResponseEntity<ApiResponse<List<Company>>> getActiveCompanies() {
        List<Company> companies = companyService.getActiveCompanies();
        return ResponseEntity.ok(ApiResponse.success(companies));
    }
    
    @GetMapping("/partners/active")
    public ResponseEntity<ApiResponse<List<Partner>>> getActivePartners() {
        List<Partner> partners = partnerService.getActivePartners();
        return ResponseEntity.ok(ApiResponse.success(partners));
    }
}
