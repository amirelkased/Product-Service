package com.fawry.productservice.util;

import com.fawry.productservice.brand.Brand;
import com.fawry.productservice.brand.BrandRepository;
import com.fawry.productservice.brand.BrandService;
import com.fawry.productservice.category.Category;
import com.fawry.productservice.category.CategoryRepository;
import com.fawry.productservice.category.CategoryService;
import com.fawry.productservice.product.Product;
import com.fawry.productservice.product.ProductRepository;
import com.fawry.productservice.product.ProductStatus;
import com.github.javafaker.Faker;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class DummyDataLoader implements CommandLineRunner {
    private final Faker faker = new Faker();
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final BrandService brandService;
    private final CategoryService categoryService;
    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger log = LoggerFactory.getLogger(DummyDataLoader.class);

    @Override
    public void run(String... args) throws Exception {

    }

    public void run(int i, String... args) {
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
            log.info(categories.toString());
            categories.forEach(category -> categoryRepository.save(
                            Category.builder().name(category).build()
                    )
            );
            log.info(brands.toString());
            brands.forEach(brand ->
                    brandRepository.save(
                            Brand.builder().name(brand).build()
                    )
            );
            data = productListResponse.getProducts().stream()
                    .map(productResponse -> {
                        log.info(productResponse.toString());
                        Product product = mapToProduct(productResponse);
                        product.setCategory(categoryService.getCategoryByName(productResponse.getCategory()));
                        product.setBrand(brandService.getBrandByName(Objects.equals(productResponse.getBrand(), null) ?"sung":productResponse.getBrand()));
                        return product;
                    })
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

    public void run() throws Exception {
        List<Category> dummyCategories = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            dummyCategories.add(
                    Category.builder()
                            .name(faker.commerce().department())
                            .build()
            );
        }
        categoryRepository.saveAll(dummyCategories);

        List<Brand> dummyBrands = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            dummyBrands.add(
                    Brand.builder()
                            .name(faker.commerce().material())
                            .build()
            );
        }
        brandRepository.saveAll(dummyBrands);

        List<Product> products = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            products.add(
                    Product.builder()
                            .sku(ProductSkuGenerator.generateAlphabeticNumberSku(8))
                            .title(faker.commerce().productName())
                            .description(faker.weather().description())
                            .price(Double.parseDouble(faker.commerce().price()))
                            .imageUrl(faker.internet().image())
                            .category(dummyCategories.get(faker.random().nextInt(0, 4)))
                            .brand(dummyBrands.get(faker.random().nextInt(0, 4)))
                            .status(ProductStatus.ACTIVE)
                            .build()
            );
        }

        productRepository.saveAll(products);
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
        private String thumbnail;  // We'll map this to imageUrl in ProductDTO
        private String category;
        private String brand;

        // Getters and Setters
    }
}
