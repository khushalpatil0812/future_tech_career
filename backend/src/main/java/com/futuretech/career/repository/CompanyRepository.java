package com.futuretech.career.repository;

import com.futuretech.career.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    
    List<Company> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    Page<Company> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    Page<Company> findByIsActiveOrderByCreatedAtDesc(Boolean isActive, Pageable pageable);
}
