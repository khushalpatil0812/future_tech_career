package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.dto.ResourceRequirementRequest;
import com.futuretech.career.model.ResourceRequirement;
import com.futuretech.career.service.ResourceRequirementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/resource-requirements")
@RequiredArgsConstructor
public class AdminResourceRequirementController {
    
    private final ResourceRequirementService resourceRequirementService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<ResourceRequirement>>> getAllResourceRequirements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String clientId,
            @RequestParam(required = false) String status) {
        
        Page<ResourceRequirement> resourcePage;
        if (clientId != null) {
            resourcePage = resourceRequirementService.getResourceRequirementsByClient(clientId, page, size);
        } else if (status != null) {
            resourcePage = resourceRequirementService.getResourceRequirementsByStatus(status, page, size);
        } else {
            resourcePage = resourceRequirementService.getAllResourceRequirements(page, size);
        }
        
        PaginationResponse<ResourceRequirement> response = new PaginationResponse<>(
                resourcePage.getContent(),
                resourcePage.getNumber(),
                resourcePage.getSize(),
                resourcePage.getTotalElements(),
                resourcePage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/open")
    public ResponseEntity<ApiResponse<List<ResourceRequirement>>> getOpenResourceRequirements() {
        List<ResourceRequirement> requirements = resourceRequirementService.getOpenResourceRequirements();
        return ResponseEntity.ok(ApiResponse.success(requirements));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResourceRequirement>> getResourceRequirementById(@PathVariable String id) {
        ResourceRequirement resourceRequirement = resourceRequirementService.getResourceRequirementById(id);
        return ResponseEntity.ok(ApiResponse.success(resourceRequirement));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<ResourceRequirement>> createResourceRequirement(
            @Valid @RequestBody ResourceRequirementRequest request) {
        
        ResourceRequirement resourceRequirement = resourceRequirementService.createResourceRequirement(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(resourceRequirement));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ResourceRequirement>> updateResourceRequirement(
            @PathVariable String id,
            @Valid @RequestBody ResourceRequirementRequest request) {
        
        ResourceRequirement resourceRequirement = resourceRequirementService.updateResourceRequirement(id, request);
        return ResponseEntity.ok(ApiResponse.success(resourceRequirement));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ResourceRequirement>> updateResourceRequirementStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        
        ResourceRequirement resourceRequirement = resourceRequirementService.updateResourceRequirementStatus(id, request.get("status"));
        return ResponseEntity.ok(ApiResponse.success(resourceRequirement));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteResourceRequirement(@PathVariable String id) {
        resourceRequirementService.deleteResourceRequirement(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
