package com.fawry.productservice.product;

import com.fawry.productservice.common.ResponsePage;
import com.fawry.productservice.product.dto.ProductsWithPriceResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/products")
@RestController
@RequiredArgsConstructor
public class ProductRestController {
    private final ProductService productService;
    private final Logger logger= LoggerFactory.getLogger(ProductRestController.class);

    @GetMapping("")
    public ResponseEntity<ResponsePage<ProductResponseDto>> getAllProducts(Pageable pageable){
        return ResponseEntity.ok(
            productService.getAllProducts(pageable)
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id){
        return ResponseEntity.ok(
                  productService.getProductBySku(id)
        );
    }

    @PostMapping("")
    public ResponseEntity<Product> createProduct(
            @RequestBody
            @Validated
            ProductRequestDto productRequestDto
    ){
        return ResponseEntity.ok(
            productService.createProduct(productRequestDto)
        );
    }

    @PutMapping("{sku}")
    public ResponseEntity<Product> updateProduct(@PathVariable String sku, @RequestBody ProductRequestDto request){
        return ResponseEntity.ok(
                productService.updateProduct(sku, request)
        );
    }

    @DeleteMapping("{sku}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void removeProduct(@PathVariable String sku){
        logger.info(sku);
        productService.deleteProduct(sku);
    }

    @GetMapping("reactive/{sku}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void reactivateProduct(@PathVariable String sku){
        productService.reactivateProduct(sku);
    }

    @PostMapping("skus")
    public ResponseEntity<ProductsWithPriceResponse> getAllProductsWithSkus(@RequestBody List<String> skus){
        return ResponseEntity.ok(
                productService.getProductsWithPrices(skus)
        );
    }
}
