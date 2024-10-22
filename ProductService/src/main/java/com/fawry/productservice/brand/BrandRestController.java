package com.fawry.productservice.brand;

import com.fawry.productservice.common.ResponsePage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/brands")
@RequiredArgsConstructor
public class BrandRestController {
    private final BrandService brandService;

    @GetMapping("")
    public ResponseEntity<ResponsePage<Brand>> getAllBrands(Pageable pageable){
        return ResponseEntity.ok(
                brandService.getAllBrands(pageable)
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<Brand> getBrand(@PathVariable Long id){
        return ResponseEntity.ok(
          brandService.getBrandById(id)
        );
    }

    @PostMapping("")
    public ResponseEntity<Brand> createBrand(@RequestBody @Validated BrandRequestDto request){
        return ResponseEntity.ok(
            brandService.createBrand(request)
        );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void removeBrand(@PathVariable Long id){
        brandService.removeBrand(id);
    }
}
