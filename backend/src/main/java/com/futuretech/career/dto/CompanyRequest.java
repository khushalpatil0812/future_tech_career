package com.futuretech.career.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {
    
    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 characters")
    private String name;
    
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;
    
    private String logoUrl;
    
    private String websiteUrl;
    
    @Size(max = 50, message = "Industry must not exceed 50 characters")
    private String industry;
    
    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String location;
    
    private Boolean isActive = true;
    
    @Min(value = 0, message = "Display order must be non-negative")
    private Integer displayOrder = 0;
}
