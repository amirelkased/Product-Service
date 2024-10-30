package com.fawry.productservice.util;

import com.fawry.productservice.brand.Brand;
import com.fawry.productservice.brand.BrandRepository;
import com.fawry.productservice.brand.implementation.BrandServiceImpl;
import com.fawry.productservice.category.Category;
import com.fawry.productservice.category.CategoryRepository;
import com.fawry.productservice.category.CategoryService;
import com.fawry.productservice.product.Product;
import com.fawry.productservice.product.ProductRepository;
import com.fawry.productservice.product.dto.ProductStatus;
import com.fawry.productservice.stock.StoreService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class DummyDataLoader implements CommandLineRunner {
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final BrandServiceImpl brandService;
    private final CategoryService categoryService;
    private final StoreService storeService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public void run(String... args) throws Exception {
        run();
    }

    public void run() {
        ResponseEntity<ProductListResponse> response = restTemplate.getForEntity("https://dummyjson.com/products?limit=194", ProductListResponse.class);
        ProductListResponse productListResponse = response.getBody();
        HashSet<String> categories = new HashSet<>();
        HashSet<String> brands = new HashSet<>();
        List<Product> data;
        if (productListResponse != null && productListResponse.getProducts() != null) {
            productListResponse.getProducts().forEach(productResponse -> {
                if (productResponse.category != null) {
                    categories.add(productResponse.getCategory());
                }
                if (productResponse.brand != null) {
                    brands.add(productResponse.getBrand());
                }
            });
//            log.info(categories.toString());
            categories.forEach(category -> categoryRepository.save(
                            Category.builder().name(category).build()
                    )
            );
//            log.info(brands.toString());
            brands.forEach(brand ->
                    brandRepository.save(
                            Brand.builder().name(brand).build()
                    )
            );
            data = productListResponse.getProducts().stream()
                    .map(productResponse -> {
//                        log.info(productResponse.toString());
                        Product product = mapToProduct(productResponse);
                        product.setStatus(ProductStatus.ACTIVE);
                        product.setCategory(categoryService.getCategoryByName(productResponse.getCategory()));
                        product.setBrand(brandService.getBrandByName(Objects.equals(productResponse.getBrand(), null) ?"sung":productResponse.getBrand()));
                        return product;
                    })
//                    .peek(product -> storeService.sendProductData(product.getSku()))
                    .toList();
            productRepository.saveAll(data);
        }

    }

    private Product mapToProduct(ProductResponse productResponse) {
        return Product.builder()
                .sku(productResponse.sku)
                .title(productResponse.title)
                .description(productResponse.description)
                .price(productResponse.price)
                .imageUrl(productResponse.thumbnail)
                .build();
    }

    @Data
    private static class ProductListResponse {
        private List<ProductResponse> products;
    }

    @Data
    private static class ProductResponse {
        private String sku;
        private String title;
        private String description;
        private double price;
        private String thumbnail;
        private String category;
        private String brand;

    }
}
