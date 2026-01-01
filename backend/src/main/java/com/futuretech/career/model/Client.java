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
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;
    
    @NotBlank(message = "Client name is required")
    @Size(max = 200)
    @Column(nullable = false)
    private String name;
    
    @Column(name = "company_name")
    @Size(max = 200)
    private String companyName;
    
    @Email(message = "Invalid email format")
    @Size(max = 100)
    private String email;
    
    @Size(max = 15)
    private String phone;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    @Column(name = "industry")
    @Size(max = 100)
    private String industry;
    
    @Column(name = "website_url")
    private String websiteUrl;
    
    @Column(name = "contact_person")
    @Size(max = 100)
    private String contactPerson;
    
    @Column(name = "status")
    @Size(max = 20)
    private String status = "active"; // active, inactive, prospect
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Contract> contracts = new ArrayList<>();
    
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<ResourceRequirement> resourceRequirements = new ArrayList<>();
    
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
