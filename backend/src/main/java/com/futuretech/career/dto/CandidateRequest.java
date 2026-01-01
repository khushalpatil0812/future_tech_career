package com.futuretech.career.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CandidateRequest {
    
    @NotBlank(message = "Candidate name is required")
    @Size(max = 100)
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100)
    private String email;
    
    @Size(max = 15)
    private String phone;
    
    private String resumeUrl;
    
    private String linkedinUrl;
    
    @Size(max = 100)
    private String currentCompany;
    
    private Double totalExperience;
    
    private String skills;
    
    @Size(max = 50)
    private String interviewStage;
    
    @Size(max = 20)
    private String finalStatus;
    
    private String hrNotes;
    
    @NotBlank(message = "Job opening ID is required")
    private String jobOpeningId;
}
