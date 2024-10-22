package com.fawry.productservice.product;

import org.springframework.stereotype.Component;

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
}
