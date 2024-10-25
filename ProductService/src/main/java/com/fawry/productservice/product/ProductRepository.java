package com.fawry.productservice.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
                SELECT new com.fawry.productservice.product.ProductResponseDto(
                p.sku,p.title,p.description, p.price,p.imageUrl,p.category.name, p.brand.name
                )
                FROM Product p
                WHERE p.status = 'ACTIVE'
            """)
    Page<ProductResponseDto> getAllProducts(Pageable pageable);

    Optional<Product> findProductBySku(String sku);

    List<Product> findProductsBySkuIn(List<String> skus);
}