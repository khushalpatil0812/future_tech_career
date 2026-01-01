package com.futuretech.career.repository;

import com.futuretech.career.model.ResourceRequirement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRequirementRepository extends JpaRepository<ResourceRequirement, String> {
    
    Page<ResourceRequirement> findByClientId(String clientId, Pageable pageable);
    
    Page<ResourceRequirement> findByStatus(String status, Pageable pageable);
    
    Page<ResourceRequirement> findByClientIdAndStatus(String clientId, String status, Pageable pageable);
    
    List<ResourceRequirement> findByClientId(String clientId);
    
    List<ResourceRequirement> findByStatus(String status);
    
    long countByClientId(String clientId);
}
