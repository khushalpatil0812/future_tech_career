package com.futuretech.career.controller.admin;

import com.futuretech.career.dto.ApiResponse;
import com.futuretech.career.dto.ClientRequest;
import com.futuretech.career.dto.PaginationResponse;
import com.futuretech.career.model.Client;
import com.futuretech.career.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/clients")
@RequiredArgsConstructor
public class AdminClientController {
    
    private final ClientService clientService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationResponse<Client>>> getAllClients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        
        Page<Client> clientPage;
        if (search != null && !search.isEmpty()) {
            clientPage = clientService.searchClients(search, page, size);
        } else if (status != null) {
            clientPage = clientService.getClientsByStatus(status, page, size);
        } else {
            clientPage = clientService.getAllClients(page, size);
        }
        
        PaginationResponse<Client> response = new PaginationResponse<>(
                clientPage.getContent(),
                clientPage.getNumber(),
                clientPage.getSize(),
                clientPage.getTotalElements(),
                clientPage.getTotalPages()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Client>>> getActiveClients() {
        List<Client> clients = clientService.getActiveClients();
        return ResponseEntity.ok(ApiResponse.success(clients));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Client>> getClientById(@PathVariable String id) {
        Client client = clientService.getClientById(id);
        return ResponseEntity.ok(ApiResponse.success(client));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Client>> createClient(@Valid @RequestBody ClientRequest request) {
        Client client = clientService.createClient(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(client));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Client>> updateClient(
            @PathVariable String id,
            @Valid @RequestBody ClientRequest request) {
        
        Client client = clientService.updateClient(id, request);
        return ResponseEntity.ok(ApiResponse.success(client));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteClient(@PathVariable String id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Client>> toggleClientStatus(@PathVariable String id) {
        Client client = clientService.toggleClientStatus(id);
        return ResponseEntity.ok(ApiResponse.success(client));
    }
}
