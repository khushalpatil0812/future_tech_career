package com.futuretech.career.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials", indexes = {
    @Index(name = "idx_active_created", columnList = "isActive, createdAt")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Testimonial {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String feedbackId;
    
    @Column(nullable = false)
    private String name;
    
    private String email;
    
    @Column(nullable = false)
    private Integer rating;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;
    
    private String role;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
