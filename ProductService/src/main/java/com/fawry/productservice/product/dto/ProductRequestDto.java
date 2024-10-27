package com.fawry.productservice.product.dto;

import com.fawry.productservice.product.Product;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class ProductRequestDto implements Serializable {
    @NotNull(message = "Product must have title")
    @NotBlank(message = "Product must have title")
    String title;
    @NotNull(message = "Product must have description")
    @NotBlank(message = "Product must have description")
    String description;
    @Positive(message = "Product must have positive price")
    double price;
    String imageUrl;
    String category;
    String brand;
}