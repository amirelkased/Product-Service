package com.fawry.productservice.product.dto;

import com.fawry.productservice.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link Product}
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto implements Serializable {
    String sku;
    String title;
    String description;
    double price;
    String imageUrl;
    String category;
    String brand;
}