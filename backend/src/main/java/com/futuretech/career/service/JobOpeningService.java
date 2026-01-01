package com.futuretech.career.service;

import com.futuretech.career.dto.JobOpeningRequest;
import com.futuretech.career.model.Company;
import com.futuretech.career.model.JobOpening;
import com.futuretech.career.repository.CompanyRepository;
import com.futuretech.career.repository.JobOpeningRepository;
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
public class JobOpeningService {
    
    private final JobOpeningRepository jobOpeningRepository;
    private final CompanyRepository companyRepository;
    
    public Page<JobOpening> getAllJobOpenings(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobOpeningRepository.findAll(pageable);
    }
    
    public Page<JobOpening> getJobOpeningsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobOpeningRepository.findByStatus(status, pageable);
    }
    
    public Page<JobOpening> getJobOpeningsByDepartment(String department, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobOpeningRepository.findByDepartment(department, pageable);
    }
    
    public Page<JobOpening> getJobOpeningsByStatusAndDepartment(String status, String department, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobOpeningRepository.findByStatusAndDepartment(status, department, pageable);
    }
    
    public Page<JobOpening> getJobOpeningsByCompany(String companyId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobOpeningRepository.findByCompanyId(companyId, pageable);
    }
    
    public JobOpening getJobOpeningById(String id) {
        return jobOpeningRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job opening not found with id: " + id));
    }
    
    @Transactional
    public JobOpening createJobOpening(JobOpeningRequest request) {
        JobOpening jobOpening = new JobOpening();
        mapRequestToEntity(request, jobOpening);
        
        JobOpening saved = jobOpeningRepository.save(jobOpening);
        log.info("Job opening created: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public JobOpening updateJobOpening(String id, JobOpeningRequest request) {
        JobOpening jobOpening = getJobOpeningById(id);
        mapRequestToEntity(request, jobOpening);
        
        JobOpening updated = jobOpeningRepository.save(jobOpening);
        log.info("Job opening updated: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public void deleteJobOpening(String id) {
        JobOpening jobOpening = getJobOpeningById(id);
        jobOpeningRepository.delete(jobOpening);
        log.info("Job opening deleted: {}", id);
    }
    
    @Transactional
    public JobOpening toggleJobOpeningStatus(String id) {
        JobOpening jobOpening = getJobOpeningById(id);
        jobOpening.setStatus("open".equals(jobOpening.getStatus()) ? "closed" : "open");
        JobOpening updated = jobOpeningRepository.save(jobOpening);
        log.info("Job opening status toggled: {} - {}", id, updated.getStatus());
        return updated;
    }
    
    private void mapRequestToEntity(JobOpeningRequest request, JobOpening jobOpening) {
        jobOpening.setTitle(request.getTitle());
        jobOpening.setDescription(request.getDescription());
        jobOpening.setDepartment(request.getDepartment());
        jobOpening.setLocation(request.getLocation());
        jobOpening.setEmploymentType(request.getEmploymentType());
        jobOpening.setExperienceLevel(request.getExperienceLevel());
        jobOpening.setSalaryRange(request.getSalaryRange());
        jobOpening.setRequirements(request.getRequirements());
        jobOpening.setResponsibilities(request.getResponsibilities());
        jobOpening.setStatus(request.getStatus() != null ? request.getStatus() : "open");
        jobOpening.setOpeningsCount(request.getOpeningsCount() != null ? request.getOpeningsCount() : 1);
        
        if (request.getCompanyId() != null && !request.getCompanyId().isEmpty()) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new RuntimeException("Company not found with id: " + request.getCompanyId()));
            jobOpening.setCompany(company);
        }
    }
}
