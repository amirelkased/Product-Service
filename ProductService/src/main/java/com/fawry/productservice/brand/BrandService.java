package com.fawry.productservice.brand;

import com.fawry.productservice.common.ResponsePage;
import com.fawry.productservice.common.ResponsePageMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final ResponsePageMapper pageMapper;


    public ResponsePage<Brand> getAllBrands(Pageable pageable) {
        Page<Brand> result = brandRepository.findAll(pageable);
        return pageMapper.toResponsePage(result);
    }

    public Brand getBrandById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("There is no brand with id %d".formatted(id)));
    }

    public Brand getBrandByName(String name) {
        return brandRepository.findBrandByNameContainsIgnoreCase(name)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "No Brand with name %s".formatted(name))
                );
    }

    public Brand createBrand(BrandRequestDto request) {
        Brand brand = Brand.builder()
                .name(request.getName())
                .build();

        return brandRepository.save(brand);
    }

    public void removeBrand(Long id) {
        Brand brand = getBrandById(id);
        brandRepository.delete(brand);
    }
}
