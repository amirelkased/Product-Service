package com.fawry.productservice.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link Product}
 */
@Data
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