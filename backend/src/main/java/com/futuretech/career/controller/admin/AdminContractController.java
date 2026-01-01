package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.ContractRequest;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.model.Contract;
import com.futuretech.career.service.ContractService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/contracts")
@RequiredArgsConstructor
public class AdminContractController {
    
    private final ContractService contractService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<Contract>>> getAllContracts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String clientId,
            @RequestParam(required = false) String status) {
        
        Page<Contract> contractPage;
        if (clientId != null) {
            contractPage = contractService.getContractsByClient(clientId, page, size);
        } else if (status != null) {
            contractPage = contractService.getContractsByStatus(status, page, size);
        } else {
            contractPage = contractService.getAllContracts(page, size);
        }
        
        PaginationResponse<Contract> response = new PaginationResponse<>(
                contractPage.getContent(),
                contractPage.getNumber(),
                contractPage.getSize(),
                contractPage.getTotalElements(),
                contractPage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/expiring")
    public ResponseEntity<ApiResponse<List<Contract>>> getExpiringContracts(
            @RequestParam(defaultValue = "30") int days) {
        
        List<Contract> contracts = contractService.getExpiringContracts(days);
        return ResponseEntity.ok(ApiResponse.success(contracts));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Contract>> getContractById(@PathVariable String id) {
        Contract contract = contractService.getContractById(id);
        return ResponseEntity.ok(ApiResponse.success(contract));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Contract>> createContract(@Valid @RequestBody ContractRequest request) {
        Contract contract = contractService.createContract(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(contract));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Contract>> updateContract(
            @PathVariable String id,
            @Valid @RequestBody ContractRequest request) {
        
        Contract contract = contractService.updateContract(id, request);
        return ResponseEntity.ok(ApiResponse.success(contract));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Contract>> updateContractStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        
        Contract contract = contractService.updateContractStatus(id, request.get("status"));
        return ResponseEntity.ok(ApiResponse.success(contract));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteContract(@PathVariable String id) {
        contractService.deleteContract(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
