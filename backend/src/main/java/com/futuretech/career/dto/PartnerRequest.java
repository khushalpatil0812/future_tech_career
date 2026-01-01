package com.futuretech.career.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartnerRequest {
    
    @NotBlank(message = "Partner name is required")
    @Size(min = 2, max = 100, message = "Partner name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Logo URL is required")
    private String logoUrl;
    
    private String websiteUrl;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    private Boolean isActive = true;
    
    @Min(value = 0, message = "Display order must be non-negative")
    private Integer displayOrder = 0;
}
