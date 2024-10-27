package com.fawry.productservice.product;

import com.fawry.productservice.common.ResponsePage;
import com.fawry.productservice.product.dto.ProductRequestDto;
import com.fawry.productservice.product.dto.ProductResponseDto;
import com.fawry.productservice.product.dto.ProductsWithPriceResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    ResponsePage<ProductResponseDto> getAllProducts(Pageable pageable);

    Product getProductBySku(String sku);

    Product createProduct(ProductRequestDto productRequestDto);

    void deleteProduct(String sku);

    void reactivateProduct(String sku);

    Product updateProduct(String sku, ProductRequestDto request);

    ProductsWithPriceResponse getProductsWithPrices(List<String> skus);
}
