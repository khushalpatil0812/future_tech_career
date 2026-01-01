package com.futuretech.career.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "resource_requirements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRequirement {
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;
    
    @NotBlank(message = "Role is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String role;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
    
    @Column(name = "project_name")
    @Size(max = 200)
    private String projectName;
    
    @Column(name = "required_count")
    private Integer requiredCount = 1;
    
    @Column(name = "fulfilled_count")
    private Integer fulfilledCount = 0;
    
    @Column(name = "skills_required", columnDefinition = "TEXT")
    private String skillsRequired;
    
    @Column(name = "experience_level")
    @Size(max = 50)
    private String experienceLevel;
    
    @Column(name = "min_experience")
    private Double minExperience; // in years
    
    @Column(name = "max_experience")
    private Double maxExperience; // in years
    
    @Column(name = "location")
    @Size(max = 200)
    private String location;
    
    @Column(name = "budget_per_resource")
    private Double budgetPerResource;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(name = "status")
    @Size(max = 20)
    private String status = "open"; // open, fulfilled, partially_fulfilled, closed, on-hold
    
    @Column(name = "priority")
    @Size(max = 20)
    private String priority = "medium"; // low, medium, high, urgent
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
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
