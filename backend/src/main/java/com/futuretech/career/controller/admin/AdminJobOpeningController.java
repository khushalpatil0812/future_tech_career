package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.JobOpeningRequest;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.model.JobOpening;
import com.futuretech.career.service.JobOpeningService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/job-openings")
@RequiredArgsConstructor
public class AdminJobOpeningController {
    
    private final JobOpeningService jobOpeningService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<JobOpening>>> getAllJobOpenings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String department) {
        
        Page<JobOpening> jobPage;
        if (status != null && department != null) {
            jobPage = jobOpeningService.getJobOpeningsByStatusAndDepartment(status, department, page, size);
        } else if (status != null) {
            jobPage = jobOpeningService.getJobOpeningsByStatus(status, page, size);
        } else if (department != null) {
            jobPage = jobOpeningService.getJobOpeningsByDepartment(department, page, size);
        } else {
            jobPage = jobOpeningService.getAllJobOpenings(page, size);
        }
        
        PaginationResponse<JobOpening> response = new PaginationResponse<>(
                jobPage.getContent(),
                jobPage.getNumber(),
                jobPage.getSize(),
                jobPage.getTotalElements(),
                jobPage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobOpening>> getJobOpeningById(@PathVariable String id) {
        JobOpening jobOpening = jobOpeningService.getJobOpeningById(id);
        return ResponseEntity.ok(ApiResponse.success(jobOpening));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<JobOpening>> createJobOpening(@Valid @RequestBody JobOpeningRequest request) {
        JobOpening jobOpening = jobOpeningService.createJobOpening(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(jobOpening));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobOpening>> updateJobOpening(
            @PathVariable String id,
            @Valid @RequestBody JobOpeningRequest request) {
        
        JobOpening jobOpening = jobOpeningService.updateJobOpening(id, request);
        return ResponseEntity.ok(ApiResponse.success(jobOpening));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJobOpening(@PathVariable String id) {
        jobOpeningService.deleteJobOpening(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<JobOpening>> toggleJobOpeningStatus(@PathVariable String id) {
        JobOpening jobOpening = jobOpeningService.toggleJobOpeningStatus(id);
        return ResponseEntity.ok(ApiResponse.success(jobOpening));
    }
}
