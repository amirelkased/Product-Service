package com.fawry.productservice.product;

import com.fawry.productservice.brand.Brand;
import com.fawry.productservice.brand.BrandService;
import com.fawry.productservice.category.Category;
import com.fawry.productservice.category.CategoryService;
import com.fawry.productservice.common.ResponsePage;
import com.fawry.productservice.common.ResponsePageMapper;
import com.fawry.productservice.util.ProductSkuGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    public static final Logger log = LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final BrandService brandService;
    private final ResponsePageMapper pageMapper;
    private final ProductMapper productMapper;

    public ResponsePage<ProductResponseDto> getAllProducts(Pageable pageable) {
        Page<ProductResponseDto> result = productRepository.getAllProducts(pageable);
        log.info(result.toString());
        return pageMapper.toResponsePage(result);
    }


    public Product getProductBySku(String sku) {
        return productRepository.findProductBySku(sku).orElseThrow(
                ()->new EntityNotFoundException("No Product with SKU %s".formatted(sku))
        );
    }

    public Product createProduct(ProductRequestDto productRequestDto) {
        Product product = prepareNewProduct(productRequestDto);
        return productRepository.save(product);
    }

    private Product prepareNewProduct(ProductRequestDto productRequestDto){
         Category category =categoryService.getCategoryByName(productRequestDto.getCategory()) ;
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

    public Product updateProduct(String sku, ProductRequestDto request) {
        Product product = getProductBySku(sku);
        Category category = categoryService.getCategoryByName(request.getCategory());
        Brand brand = brandService.getBrandByName(request.getBrand());
        productMapper.copyProductDtoToProductEntity(product, request);
        product.setBrand(brand);
        product.setCategory(category);
        return productRepository.save(product);
    }
}
