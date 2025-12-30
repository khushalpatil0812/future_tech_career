package com.futuretech.career.repository;

import com.futuretech.career.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, String> {
    Optional<Content> findBySection(String section);
}
