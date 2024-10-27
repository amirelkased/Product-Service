package com.fawry.productservice.category;

import com.fawry.productservice.category.dto.CategoryRequestDto;
import com.fawry.productservice.common.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {
    ResponsePage<Category> getAllCategories(Pageable pageable);

    Category getCategoryById(Long id);

    Category getCategoryByName(String name);

    Category createCategory(CategoryRequestDto request);

    void removeCategory(Long id);
}
