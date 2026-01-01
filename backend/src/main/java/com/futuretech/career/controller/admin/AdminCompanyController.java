package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.CompanyRequest;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.model.Company;
import com.futuretech.career.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/companies")
@RequiredArgsConstructor
public class AdminCompanyController {
    
    private final CompanyService companyService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<Company>>> getAllCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Company> companyPage = companyService.getAllCompanies(page, size);
        
        PaginationResponse<Company> response = new PaginationResponse<>(
                companyPage.getContent(),
                companyPage.getNumber(),
                companyPage.getSize(),
                companyPage.getTotalElements(),
                companyPage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Company>> getCompanyById(@PathVariable String id) {
        Company company = companyService.getCompanyById(id);
        return ResponseEntity.ok(ApiResponse.success(company));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Company>> createCompany(@Valid @RequestBody CompanyRequest request) {
        Company company = companyService.createCompany(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(company));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Company>> updateCompany(
            @PathVariable String id,
            @Valid @RequestBody CompanyRequest request) {
        
        Company company = companyService.updateCompany(id, request);
        return ResponseEntity.ok(ApiResponse.success(company));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCompany(@PathVariable String id) {
        companyService.deleteCompany(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Company>> toggleCompanyStatus(@PathVariable String id) {
        Company company = companyService.toggleCompanyStatus(id);
        return ResponseEntity.ok(ApiResponse.success(company));
    }
}
