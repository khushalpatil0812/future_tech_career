package com.futuretech.career.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;
    
    @NotBlank(message = "Position is required")
    @Size(min = 3, max = 100, message = "Position must be between 3 and 100 characters")
    private String position;
    
    @Size(max = 100, message = "Company name must not exceed 100 characters")
    private String company;
    
    @NotBlank(message = "Content is required")
    @Size(min = 20, max = 1000, message = "Content must be between 20 and 1000 characters")
    private String content;
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Integer rating;
    
    private String avatarUrl;
    
    private Boolean isActive = true;
    
    @Min(value = 0, message = "Display order must be non-negative")
    private Integer displayOrder = 0;
}
