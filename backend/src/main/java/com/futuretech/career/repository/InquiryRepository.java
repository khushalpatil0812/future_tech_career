package com.futuretech.career.repository;

import com.futuretech.career.model.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, String> {
    Page<Inquiry> findByIsRead(Boolean isRead, Pageable pageable);
    Page<Inquiry> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByIsRead(Boolean isRead);
}
