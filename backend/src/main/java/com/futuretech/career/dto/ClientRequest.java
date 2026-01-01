package com.futuretech.career.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ClientRequest {
    
    @NotBlank(message = "Client name is required")
    @Size(max = 200)
    private String name;
    
    @Size(max = 200)
    private String companyName;
    
    @Email(message = "Invalid email format")
    @Size(max = 100)
    private String email;
    
    @Size(max = 15)
    private String phone;
    
    private String address;
    
    @Size(max = 100)
    private String industry;
    
    private String websiteUrl;
    
    @Size(max = 100)
    private String contactPerson;
    
    @Size(max = 20)
    private String status;
    
    private String notes;
}
