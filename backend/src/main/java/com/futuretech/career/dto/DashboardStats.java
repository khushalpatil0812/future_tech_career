package com.futuretech.career.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long totalInquiries;
    private long unreadInquiries;
    private long pendingFeedback;
    private long activeTestimonials;
    private LocalDateTime lastUpdated;
}
