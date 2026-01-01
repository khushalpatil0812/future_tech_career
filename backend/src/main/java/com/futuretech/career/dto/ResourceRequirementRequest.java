package com.futuretech.career.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ResourceRequirementRequest {
    
    @NotBlank(message = "Role is required")
    @Size(max = 100)
    private String role;
    
    private String description;
    
    @NotBlank(message = "Client ID is required")
    private String clientId;
    
    @Size(max = 200)
    private String projectName;
    
    private Integer requiredCount;
    
    private Integer fulfilledCount;
    
    private String skillsRequired;
    
    @Size(max = 50)
    private String experienceLevel;
    
    private Double minExperience;
    
    private Double maxExperience;
    
    @Size(max = 200)
    private String location;
    
    private Double budgetPerResource;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    @Size(max = 20)
    private String status;
    
    @Size(max = 20)
    private String priority;
    
    private String notes;
}
