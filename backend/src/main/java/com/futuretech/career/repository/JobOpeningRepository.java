package com.futuretech.career.repository;

import com.futuretech.career.model.JobOpening;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOpeningRepository extends JpaRepository<JobOpening, String> {
    
    Page<JobOpening> findByStatus(String status, Pageable pageable);
    
    Page<JobOpening> findByDepartment(String department, Pageable pageable);
    
    Page<JobOpening> findByStatusAndDepartment(String status, String department, Pageable pageable);
    
    Page<JobOpening> findByCompanyId(String companyId, Pageable pageable);
    
    List<JobOpening> findByStatus(String status);
}
