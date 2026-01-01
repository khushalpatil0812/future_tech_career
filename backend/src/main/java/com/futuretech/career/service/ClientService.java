package com.futuretech.career.service;

import com.futuretech.career.dto.ClientRequest;
import com.futuretech.career.model.Client;
import com.futuretech.career.repository.ClientRepository;
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
public class ClientService {
    
    private final ClientRepository clientRepository;
    
    public Page<Client> getAllClients(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return clientRepository.findAll(pageable);
    }
    
    public Page<Client> getClientsByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return clientRepository.findByStatus(status, pageable);
    }
    
    public Page<Client> searchClients(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return clientRepository.searchClients(search, pageable);
    }
    
    public Client getClientById(String id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }
    
    public List<Client> getActiveClients() {
        return clientRepository.findByStatus("active");
    }
    
    @Transactional
    public Client createClient(ClientRequest request) {
        Client client = new Client();
        mapRequestToEntity(request, client);
        
        Client saved = clientRepository.save(client);
        log.info("Client created: {}", saved.getId());
        return saved;
    }
    
    @Transactional
    public Client updateClient(String id, ClientRequest request) {
        Client client = getClientById(id);
        mapRequestToEntity(request, client);
        
        Client updated = clientRepository.save(client);
        log.info("Client updated: {}", updated.getId());
        return updated;
    }
    
    @Transactional
    public void deleteClient(String id) {
        Client client = getClientById(id);
        clientRepository.delete(client);
        log.info("Client deleted: {}", id);
    }
    
    @Transactional
    public Client toggleClientStatus(String id) {
        Client client = getClientById(id);
        client.setStatus("active".equals(client.getStatus()) ? "inactive" : "active");
        Client updated = clientRepository.save(client);
        log.info("Client status toggled: {} - {}", id, updated.getStatus());
        return updated;
    }
    
    private void mapRequestToEntity(ClientRequest request, Client client) {
        client.setName(request.getName());
        client.setCompanyName(request.getCompanyName());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        client.setAddress(request.getAddress());
        client.setIndustry(request.getIndustry());
        client.setWebsiteUrl(request.getWebsiteUrl());
        client.setContactPerson(request.getContactPerson());
        client.setStatus(request.getStatus() != null ? request.getStatus() : "active");
        client.setNotes(request.getNotes());
    }
}
