package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.CandidateRequest;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.model.Candidate;
import com.futuretech.career.service.CandidateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/candidates")
@RequiredArgsConstructor
public class AdminCandidateController {
    
    private final CandidateService candidateService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<Candidate>>> getAllCandidates(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String jobOpeningId,
            @RequestParam(required = false) String interviewStage,
            @RequestParam(required = false) String finalStatus) {
        
        Page<Candidate> candidatePage;
        if (jobOpeningId != null) {
            candidatePage = candidateService.getCandidatesByJobOpening(jobOpeningId, page, size);
        } else if (interviewStage != null) {
            candidatePage = candidateService.getCandidatesByInterviewStage(interviewStage, page, size);
        } else if (finalStatus != null) {
            candidatePage = candidateService.getCandidatesByFinalStatus(finalStatus, page, size);
        } else {
            candidatePage = candidateService.getAllCandidates(page, size);
        }
        
        PaginationResponse<Candidate> response = new PaginationResponse<>(
                candidatePage.getContent(),
                candidatePage.getNumber(),
                candidatePage.getSize(),
                candidatePage.getTotalElements(),
                candidatePage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Candidate>> getCandidateById(@PathVariable String id) {
        Candidate candidate = candidateService.getCandidateById(id);
        return ResponseEntity.ok(ApiResponse.success(candidate));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Candidate>> createCandidate(@Valid @RequestBody CandidateRequest request) {
        Candidate candidate = candidateService.createCandidate(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(candidate));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Candidate>> updateCandidate(
            @PathVariable String id,
            @Valid @RequestBody CandidateRequest request) {
        
        Candidate candidate = candidateService.updateCandidate(id, request);
        return ResponseEntity.ok(ApiResponse.success(candidate));
    }
    
    @PatchMapping("/{id}/interview-stage")
    public ResponseEntity<ApiResponse<Candidate>> updateInterviewStage(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        
        Candidate candidate = candidateService.updateInterviewStage(id, request.get("interviewStage"));
        return ResponseEntity.ok(ApiResponse.success(candidate));
    }
    
    @PatchMapping("/{id}/hr-notes")
    public ResponseEntity<ApiResponse<Candidate>> updateHRNotes(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        
        Candidate candidate = candidateService.updateHRNotes(id, request.get("hrNotes"));
        return ResponseEntity.ok(ApiResponse.success(candidate));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCandidate(@PathVariable String id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
