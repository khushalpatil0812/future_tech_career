package com.futuretech.career.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ContractRequest {
    
    @NotBlank(message = "Contract name is required")
    @Size(max = 200)
    private String name;
    
    @Size(max = 50)
    private String contractNumber;
    
    private String description;
    
    @NotBlank(message = "Client ID is required")
    private String clientId;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    private LocalDate endDate;
    
    private Double contractValue;
    
    @Size(max = 10)
    private String currency;
    
    @Size(max = 20)
    private String status;
    
    @Size(max = 100)
    private String paymentTerms;
    
    private String documentUrl;
    
    private String terms;
    
    private String notes;
}
