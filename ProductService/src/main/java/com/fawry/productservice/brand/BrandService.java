package com.fawry.productservice.brand;

import com.fawry.productservice.brand.dto.BrandRequestDto;
import com.fawry.productservice.common.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface BrandService {
    ResponsePage<Brand> getAllBrands(Pageable pageable);

    Brand getBrandById(Long id);

    Brand getBrandByName(String name);

    Brand createBrand(BrandRequestDto request);

    void removeBrand(Long id);
}
