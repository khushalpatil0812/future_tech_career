package com.futuretech.career.service;

import com.futuretech.career.dto.ResourceRequirementRequest;
import com.futuretech.career.model.Client;
import com.futuretech.career.model.ResourceRequirement;
import com.futuretech.career.repository.ClientRepository;
import com.futuretech.career.repository.ResourceRequirementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceRequirementService {
    
    private final ResourceRequirementRepository resourceRequirementRepository;
    private final ClientRepository clientRepository;
    
    public Page<ResourceRequirement> getAllResourceRequirements(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return resourceRequirementRepository.findAll(pageable);
    }
    
    public Page<ResourceRequirement> getResourceRequirementsByClient(String clientId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return resourceRequirementRepository.findByClientId(clientId, pageable);
    }
    
    public Page<ResourceRequirement> getResourceRequirementsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return resourceRequirementRepository.findByStatus(status, pageable);
    }
    
    public List<ResourceRequirement> getOpenResourceRequirements() {
        return resourceRequirementRepository.findByStatus("open");
    }
    
    public ResourceRequirement getResourceRequirementById(String id) {
        return resourceRequirementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource requirement not found with id: " + id));
    }
    
    @Transactional
    public ResourceRequirement createResourceRequirement(ResourceRequirementRequest request) {
        ResourceRequirement resourceRequirement = new ResourceRequirement();
        mapRequestToEntity(request, resourceRequirement);
        
        ResourceRequirement saved = resourceRequirementRepository.save(resourceRequirement);
        log.info("Resource requirement created: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public ResourceRequirement updateResourceRequirement(String id, ResourceRequirementRequest request) {
        ResourceRequirement resourceRequirement = getResourceRequirementById(id);
        mapRequestToEntity(request, resourceRequirement);
        
        ResourceRequirement updated = resourceRequirementRepository.save(resourceRequirement);
        log.info("Resource requirement updated: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public ResourceRequirement updateResourceRequirementStatus(String id, String status) {
        ResourceRequirement resourceRequirement = getResourceRequirementById(id);
        resourceRequirement.setStatus(status);
        
        ResourceRequirement updated = resourceRequirementRepository.save(resourceRequirement);
        log.info("Resource requirement status updated: {} - {}", id, status);
        return updated;
    }
    
    @Transactional
    public void deleteResourceRequirement(String id) {
        ResourceRequirement resourceRequirement = getResourceRequirementById(id);
        resourceRequirementRepository.delete(resourceRequirement);
        log.info("Resource requirement deleted: {}", id);
    }
    
    private void mapRequestToEntity(ResourceRequirementRequest request, ResourceRequirement resourceRequirement) {
        resourceRequirement.setRole(request.getRole());
        resourceRequirement.setDescription(request.getDescription());
        resourceRequirement.setProjectName(request.getProjectName());
        resourceRequirement.setRequiredCount(request.getRequiredCount() != null ? request.getRequiredCount() : 1);
        resourceRequirement.setFulfilledCount(request.getFulfilledCount() != null ? request.getFulfilledCount() : 0);
        resourceRequirement.setSkillsRequired(request.getSkillsRequired());
        resourceRequirement.setExperienceLevel(request.getExperienceLevel());
        resourceRequirement.setMinExperience(request.getMinExperience());
        resourceRequirement.setMaxExperience(request.getMaxExperience());
        resourceRequirement.setLocation(request.getLocation());
        resourceRequirement.setBudgetPerResource(request.getBudgetPerResource());
        resourceRequirement.setStartDate(request.getStartDate());
        resourceRequirement.setEndDate(request.getEndDate());
        resourceRequirement.setStatus(request.getStatus() != null ? request.getStatus() : "open");
        resourceRequirement.setPriority(request.getPriority() != null ? request.getPriority() : "medium");
        resourceRequirement.setNotes(request.getNotes());
        
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + request.getClientId()));
        resourceRequirement.setClient(client);
    }
}
