package com.fawry.productservice.product.implementation;

import com.fawry.productservice.brand.Brand;
import com.fawry.productservice.brand.BrandService;
import com.fawry.productservice.category.Category;
import com.fawry.productservice.category.CategoryService;
import com.fawry.productservice.common.ResponsePage;
import com.fawry.productservice.common.ResponsePageMapper;
import com.fawry.productservice.product.Product;
import com.fawry.productservice.product.ProductMapper;
import com.fawry.productservice.product.ProductRepository;
import com.fawry.productservice.product.ProductService;
import com.fawry.productservice.product.dto.ProductRequestDto;
import com.fawry.productservice.product.dto.ProductResponseDto;
import com.fawry.productservice.product.dto.ProductStatus;
import com.fawry.productservice.product.dto.ProductsWithPriceResponse;
import com.fawry.productservice.stock.StoreService;
import com.fawry.productservice.util.ProductSkuGenerator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final BrandService brandService;
    private final ResponsePageMapper pageMapper;
    private final ProductMapper productMapper;
    private final StoreService storeService;

    public ResponsePage<ProductResponseDto> getAllProducts(Pageable pageable) {
        Page<ProductResponseDto> result = productRepository.getAllProducts(pageable);
        log.info(result.toString());
        return pageMapper.toResponsePage(result);
    }


    public Product getProductBySku(String sku) {
        return productRepository.findProductBySku(sku).orElseThrow(
                () -> new EntityNotFoundException("No Product with SKU %s".formatted(sku))
        );
    }

    @Transactional
    public Product createProduct(ProductRequestDto productRequestDto) {
        Product product = prepareNewProduct(productRequestDto);
        product = productRepository.save(product);
        storeService.sendProductData(product.getSku());
        return product;
    }

    private @NotNull Product prepareNewProduct(ProductRequestDto productRequestDto) {
        Category category = categoryService.getCategoryByName(productRequestDto.getCategory());
        Brand brand = brandService.getBrandByName(productRequestDto.getBrand());
        Product product = productMapper.mapToProduct(productRequestDto);
        product.setCategory(category);
        product.setBrand(brand);
        product.setSku(ProductSkuGenerator.generateAlphabeticNumberSku(8));
        return product;
    }

    public void deleteProduct(String sku) {
        Product product = getProductBySku(sku);
        product.setStatus(ProductStatus.INACTIVE);
        productRepository.save(product);
    }

    public void reactivateProduct(String sku) {
        Product product = getProductBySku(sku);
        product.setStatus(ProductStatus.ACTIVE);
        productRepository.save(product);
    }

    public Product updateProduct(String sku, @NotNull ProductRequestDto request) {
        Product product = getProductBySku(sku);
        Category category = categoryService.getCategoryByName(request.getCategory());
        Brand brand = brandService.getBrandByName(request.getBrand());
        productMapper.copyProductDtoToProductEntity(product, request);
        product.setBrand(brand);
        product.setCategory(category);
        return productRepository.save(product);
    }

    public ProductsWithPriceResponse getProductsWithPrices(List<String> skus) {
        List<Product> products = productRepository.findProductsBySkuIn(skus);

        if (skus.size() != products.size()) {
            List<String> foundSkus = products.stream()
                    .map(Product::getSku)
                    .toList();
            List<String> missingSkus = skus.stream()
                    .filter(sku -> !foundSkus.contains(sku))
                    .toList();
            throw new IllegalArgumentException("The following SKUs were not found: " + missingSkus);
        }

        return ProductsWithPriceResponse.builder()
                .status("success")
                .message("All Products along with prices")
                .productDtos(productMapper.mapToProductsDto(products))
                .build();
    }
}