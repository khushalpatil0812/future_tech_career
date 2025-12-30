package com.futuretech.career.repository;

import com.futuretech.career.model.SEO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SEORepository extends JpaRepository<SEO, String> {
    Optional<SEO> findByPage(String page);
}
