package com.futuretech.career.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class JobOpeningRequest {
    
    @NotBlank(message = "Job title is required")
    @Size(max = 200)
    private String title;
    
    private String description;
    
    @Size(max = 100)
    private String department;
    
    @Size(max = 200)
    private String location;
    
    @Size(max = 50)
    private String employmentType;
    
    @Size(max = 50)
    private String experienceLevel;
    
    @Size(max = 100)
    private String salaryRange;
    
    private String requirements;
    
    private String responsibilities;
    
    @Size(max = 20)
    private String status;
    
    private Integer openingsCount;
    
    private String companyId;
}
