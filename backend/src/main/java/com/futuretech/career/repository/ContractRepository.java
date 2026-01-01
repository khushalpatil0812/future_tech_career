package com.futuretech.career.repository;

import com.futuretech.career.model.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, String> {
    
    Page<Contract> findByClientId(String clientId, Pageable pageable);
    
    Page<Contract> findByStatus(String status, Pageable pageable);
    
    List<Contract> findByClientId(String clientId);
    
    @Query("SELECT c FROM Contract c WHERE c.endDate BETWEEN :startDate AND :endDate")
    List<Contract> findExpiringContracts(LocalDate startDate, LocalDate endDate);
    
    long countByClientId(String clientId);
}
