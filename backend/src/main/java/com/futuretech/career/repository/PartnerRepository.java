package com.futuretech.career.repository;

import com.futuretech.career.model.Partner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, String> {
    
    List<Partner> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    Page<Partner> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    Page<Partner> findByIsActiveOrderByCreatedAtDesc(Boolean isActive, Pageable pageable);
}
