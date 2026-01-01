package com.futuretech.career.service;

import com.futuretech.career.dto.CandidateRequest;
import com.futuretech.career.model.Candidate;
import com.futuretech.career.model.JobOpening;
import com.futuretech.career.repository.CandidateRepository;
import com.futuretech.career.repository.JobOpeningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CandidateService {
    
    private final CandidateRepository candidateRepository;
    private final JobOpeningRepository jobOpeningRepository;
    
    public Page<Candidate> getAllCandidates(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return candidateRepository.findAll(pageable);
    }
    
    public Page<Candidate> getCandidatesByJobOpening(String jobOpeningId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return candidateRepository.findByJobOpeningId(jobOpeningId, pageable);
    }
    
    public Page<Candidate> getCandidatesByInterviewStage(String interviewStage, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return candidateRepository.findByInterviewStage(interviewStage, pageable);
    }
    
    public Page<Candidate> getCandidatesByFinalStatus(String finalStatus, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return candidateRepository.findByFinalStatus(finalStatus, pageable);
    }
    
    public Candidate getCandidateById(String id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
    }
    
    @Transactional
    public Candidate createCandidate(CandidateRequest request) {
        Candidate candidate = new Candidate();
        mapRequestToEntity(request, candidate);
        
        Candidate saved = candidateRepository.save(candidate);
        log.info("Candidate created: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public Candidate updateCandidate(String id, CandidateRequest request) {
        Candidate candidate = getCandidateById(id);
        mapRequestToEntity(request, candidate);
        
        Candidate updated = candidateRepository.save(candidate);
        log.info("Candidate updated: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public Candidate updateInterviewStage(String id, String interviewStage) {
        Candidate candidate = getCandidateById(id);
        candidate.setInterviewStage(interviewStage);
        
        Candidate updated = candidateRepository.save(candidate);
        log.info("Candidate interview stage updated: {} - {}", id, interviewStage);
        return updated;
    }
    
    @Transactional
    public Candidate updateHRNotes(String id, String hrNotes) {
        Candidate candidate = getCandidateById(id);
        candidate.setHrNotes(hrNotes);
        
        Candidate updated = candidateRepository.save(candidate);
        log.info("Candidate HR notes updated: {}", id);
        return updated;
    }
    
    @Transactional
    public void deleteCandidate(String id) {
        Candidate candidate = getCandidateById(id);
        candidateRepository.delete(candidate);
        log.info("Candidate deleted: {}", id);
    }
    
    private void mapRequestToEntity(CandidateRequest request, Candidate candidate) {
        candidate.setName(request.getName());
        candidate.setEmail(request.getEmail());
        candidate.setPhone(request.getPhone());
        candidate.setResumeUrl(request.getResumeUrl());
        candidate.setLinkedinUrl(request.getLinkedinUrl());
        candidate.setCurrentCompany(request.getCurrentCompany());
        candidate.setTotalExperience(request.getTotalExperience());
        candidate.setSkills(request.getSkills());
        candidate.setInterviewStage(request.getInterviewStage() != null ? request.getInterviewStage() : "screening");
        candidate.setFinalStatus(request.getFinalStatus() != null ? request.getFinalStatus() : "in-progress");
        candidate.setHrNotes(request.getHrNotes());
        
        JobOpening jobOpening = jobOpeningRepository.findById(request.getJobOpeningId())
                .orElseThrow(() -> new RuntimeException("Job opening not found with id: " + request.getJobOpeningId()));
        candidate.setJobOpening(jobOpening);
    }
}
