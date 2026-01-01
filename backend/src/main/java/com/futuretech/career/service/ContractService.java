package com.futuretech.career.service;

import com.futuretech.career.dto.ContractRequest;
import com.futuretech.career.model.Client;
import com.futuretech.career.model.Contract;
import com.futuretech.career.repository.ClientRepository;
import com.futuretech.career.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContractService {
    
    private final ContractRepository contractRepository;
    private final ClientRepository clientRepository;
    
    public Page<Contract> getAllContracts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return contractRepository.findAll(pageable);
    }
    
    public Page<Contract> getContractsByClient(String clientId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return contractRepository.findByClientId(clientId, pageable);
    }
    
    public Page<Contract> getContractsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return contractRepository.findByStatus(status, pageable);
    }
    
    public List<Contract> getExpiringContracts(int days) {
        LocalDate today = LocalDate.now();
        LocalDate futureDate = today.plusDays(days);
        return contractRepository.findExpiringContracts(today, futureDate);
    }
    
    public Contract getContractById(String id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contract not found with id: " + id));
    }
    
    @Transactional
    public Contract createContract(ContractRequest request) {
        Contract contract = new Contract();
        mapRequestToEntity(request, contract);
        
        Contract saved = contractRepository.save(contract);
        log.info("Contract created: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public Contract updateContract(String id, ContractRequest request) {
        Contract contract = getContractById(id);
        mapRequestToEntity(request, contract);
        
        Contract updated = contractRepository.save(contract);
        log.info("Contract updated: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public void deleteContract(String id) {
        Contract contract = getContractById(id);
        contractRepository.delete(contract);
        log.info("Contract deleted: {}", id);
    }
    
    @Transactional
    public Contract updateContractStatus(String id, String status) {
        Contract contract = getContractById(id);
        contract.setStatus(status);
        
        Contract updated = contractRepository.save(contract);
        log.info("Contract status updated: {} - {}", id, status);
        return updated;
    }
    
    private void mapRequestToEntity(ContractRequest request, Contract contract) {
        contract.setName(request.getName());
        contract.setContractNumber(request.getContractNumber());
        contract.setDescription(request.getDescription());
        contract.setStartDate(request.getStartDate());
        contract.setEndDate(request.getEndDate());
        contract.setContractValue(request.getContractValue());
        contract.setCurrency(request.getCurrency() != null ? request.getCurrency() : "USD");
        contract.setStatus(request.getStatus() != null ? request.getStatus() : "active");
        contract.setPaymentTerms(request.getPaymentTerms());
        contract.setDocumentUrl(request.getDocumentUrl());
        contract.setTerms(request.getTerms());
        contract.setNotes(request.getNotes());
        
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + request.getClientId()));
        contract.setClient(client);
    }
}
