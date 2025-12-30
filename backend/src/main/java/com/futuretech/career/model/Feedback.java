package com.futuretech.career.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedback", indexes = {
    @Index(name = "idx_status_created", columnList = "status, createdAt")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 3, message = "Name must be at least 3 characters")
    @Column(nullable = false)
    private String name;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    @Column(nullable = false)
    private Integer rating;
    
    @NotBlank(message = "Feedback is required")
    @Size(min = 10, message = "Feedback must be at least 10 characters")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String feedback;
    
    @Column(nullable = false)
    private Boolean consent = true;
    
    @Column(nullable = false)
    private String status = "pending"; // pending, approved, rejected
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
