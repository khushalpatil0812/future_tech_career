package com.futuretech.career.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "seo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class SEO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false, unique = true)
    private String page;
    
    @Size(max = 60, message = "Title should not exceed 60 characters")
    @Column(nullable = false)
    private String title;
    
    @Size(max = 160, message = "Description should not exceed 160 characters")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    
    private String keywords;
    
    private String ogImage;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
