package com.futuretech.career.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginationResponse<T> {
    private T data;
    private PaginationInfo pagination;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaginationInfo {
        private long total;
        private int page;
        private int limit;
        private int totalPages;
    }
}
