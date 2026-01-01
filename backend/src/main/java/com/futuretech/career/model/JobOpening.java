package com.futuretech.career.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "job_openings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobOpening {
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;
    
    @NotBlank(message = "Job title is required")
    @Size(max = 200)
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "department")
    @Size(max = 100)
    private String department;
    
    @Column(name = "location")
    @Size(max = 200)
    private String location;
    
    @Column(name = "employment_type")
    @Size(max = 50)
    private String employmentType; // Full-time, Part-time, Contract
    
    @Column(name = "experience_level")
    @Size(max = 50)
    private String experienceLevel; // Entry, Mid, Senior
    
    @Column(name = "salary_range")
    @Size(max = 100)
    private String salaryRange;
    
    @Column(columnDefinition = "TEXT")
    private String requirements;
    
    @Column(columnDefinition = "TEXT")
    private String responsibilities;
    
    @Column(name = "status")
    @Size(max = 20)
    private String status = "open"; // open, closed, on-hold
    
    @Column(name = "openings_count")
    private Integer openingsCount = 1;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    
    @OneToMany(mappedBy = "jobOpening", cascade = CascadeType.ALL)
    private List<Candidate> candidates = new ArrayList<>();
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
