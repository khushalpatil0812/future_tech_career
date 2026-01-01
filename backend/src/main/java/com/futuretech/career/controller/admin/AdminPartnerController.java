package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.dto.PartnerRequest;
import com.futuretech.career.model.Partner;
import com.futuretech.career.service.PartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/partners")
@RequiredArgsConstructor
public class AdminPartnerController {
    
    private final PartnerService partnerService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<Partner>>> getAllPartners(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<Partner> partnerPage = partnerService.getAllPartners(page, size);
        
        PaginationResponse<Partner> response = new PaginationResponse<>(
                partnerPage.getContent(),
                partnerPage.getNumber(),
                partnerPage.getSize(),
                partnerPage.getTotalElements(),
                partnerPage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Partner>> getPartnerById(@PathVariable String id) {
        Partner partner = partnerService.getPartnerById(id);
        return ResponseEntity.ok(ApiResponse.success(partner));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Partner>> createPartner(@Valid @RequestBody PartnerRequest request) {
        Partner partner = partnerService.createPartner(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(partner));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Partner>> updatePartner(
            @PathVariable String id,
            @Valid @RequestBody PartnerRequest request) {
        
        Partner partner = partnerService.updatePartner(id, request);
        return ResponseEntity.ok(ApiResponse.success(partner));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePartner(@PathVariable String id) {
        partnerService.deletePartner(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Partner>> togglePartnerStatus(@PathVariable String id) {
        Partner partner = partnerService.togglePartnerStatus(id);
        return ResponseEntity.ok(ApiResponse.success(partner));
    }
}
