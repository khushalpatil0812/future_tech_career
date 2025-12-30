package com.futuretech.career.service;

import com.futuretech.career.dto.LoginRequest;
import com.futuretech.career.dto.LoginResponse;
import com.futuretech.career.dto.RegisterRequest;
import com.futuretech.career.exception.BadRequestException;
import com.futuretech.career.exception.UnauthorizedException;
import com.futuretech.career.model.Admin;
import com.futuretech.career.repository.AdminRepository;
import com.futuretech.career.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    @Value("${admin.secret}")
    private String adminSecret;
    
    public LoginResponse register(RegisterRequest request) {
        // Check if admin already exists
        if (adminRepository.count() > 0) {
            // Require admin secret for additional admin registration
            if (request.getAdminSecretKey() == null || 
                !request.getAdminSecretKey().equals(adminSecret)) {
                throw new BadRequestException("Invalid admin secret key");
            }
        }
        
        // Check if email already exists
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        
        // Create new admin
        Admin admin = new Admin();
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setName(request.getName());
        admin.setRole("admin");
        
        admin = adminRepository.save(admin);
        
        // Generate token
        String token = jwtUtil.generateToken(admin.getId(), admin.getEmail(), admin.getRole());
        
        // Create response
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                admin.getId(),
                admin.getEmail(),
                admin.getName(),
                admin.getRole()
        );
        
        return new LoginResponse(token, userInfo);
    }
    
    public LoginResponse login(LoginRequest request) {
        // Find admin by email
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }
        
        // Generate token
        String token = jwtUtil.generateToken(admin.getId(), admin.getEmail(), admin.getRole());
        
        // Create response
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                admin.getId(),
                admin.getEmail(),
                admin.getName(),
                admin.getRole()
        );
        
        return new LoginResponse(token, userInfo);
    }
}
