package com.fawry.productservice.stock;

import org.springframework.stereotype.Service;

@Service
public interface StoreService {
    void sendProductData(String message);
}
