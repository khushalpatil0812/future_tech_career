package com.futuretech.career.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;
    
    @NotBlank(message = "Candidate name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100)
    @Column(nullable = false)
    private String email;
    
    @Size(max = 15)
    private String phone;
    
    @Column(name = "resume_url")
    private String resumeUrl;
    
    @Column(name = "linkedin_url")
    private String linkedinUrl;
    
    @Column(name = "current_company")
    @Size(max = 100)
    private String currentCompany;
    
    @Column(name = "total_experience")
    private Double totalExperience; // in years
    
    @Column(columnDefinition = "TEXT")
    private String skills;
    
    @Column(name = "interview_stage")
    @Size(max = 50)
    private String interviewStage = "screening"; // screening, technical, hr, final, offered, rejected
    
    @Column(name = "final_status")
    @Size(max = 20)
    private String finalStatus = "in-progress"; // in-progress, selected, rejected, offered, joined
    
    @Column(name = "hr_notes", columnDefinition = "TEXT")
    private String hrNotes;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_opening_id", nullable = false)
    private JobOpening jobOpening;
    
    @Column(name = "applied_at", updatable = false)
    private LocalDateTime appliedAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
