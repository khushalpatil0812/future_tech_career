package com.futuretech.career.repository;

import com.futuretech.career.model.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    
    Page<Candidate> findByJobOpeningId(String jobOpeningId, Pageable pageable);
    
    Page<Candidate> findByInterviewStage(String interviewStage, Pageable pageable);
    
    Page<Candidate> findByFinalStatus(String finalStatus, Pageable pageable);
    
    Page<Candidate> findByJobOpeningIdAndInterviewStage(String jobOpeningId, String interviewStage, Pageable pageable);
    
    List<Candidate> findByJobOpeningId(String jobOpeningId);
    
    long countByJobOpeningId(String jobOpeningId);
}
