package com.futuretech.career.repository;

import com.futuretech.career.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, String> {
    Page<Feedback> findByStatus(String status, Pageable pageable);
    Page<Feedback> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(String status);
}
