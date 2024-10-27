package com.fawry.productservice.product;

import com.fawry.productservice.product.dto.ProductDto;
import com.fawry.productservice.product.dto.ProductRequestDto;
import com.fawry.productservice.product.dto.ProductStatus;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    public Product mapToProduct(ProductRequestDto productRequestDto){
        return Product.builder()
                .title(productRequestDto.getTitle())
                .description(productRequestDto.getDescription())
                .price(productRequestDto.getPrice())
                .imageUrl(productRequestDto.getImageUrl())
                .status(ProductStatus.ACTIVE)
                .build();
    }

    public void copyProductDtoToProductEntity(Product product, ProductRequestDto request){
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
    }

      public List<ProductDto> mapToProductsDto(@NotNull List<Product> products) {
        return products.stream().map(product ->
                ProductDto.builder()
                        .sku(product.getSku())
                        .price(product.getPrice())
                        .build()
        ).toList();
    }
}
