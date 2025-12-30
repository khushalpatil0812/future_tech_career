package com.futuretech.career.repository;

import com.futuretech.career.model.Testimonial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, String> {
    List<Testimonial> findByIsActiveTrueOrderByCreatedAtDesc();
    Page<Testimonial> findByIsActive(Boolean isActive, Pageable pageable);
    Page<Testimonial> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByIsActive(Boolean isActive);
}
