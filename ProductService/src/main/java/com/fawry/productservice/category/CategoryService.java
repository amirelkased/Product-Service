package com.fawry.productservice.category;

import com.fawry.productservice.common.ResponsePage;
import com.fawry.productservice.common.ResponsePageMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ResponsePageMapper pageMapper;


    public ResponsePage<Category> getAllCategories(Pageable pageable) {
        Page<Category> result = categoryRepository.findAll(pageable);
        return pageMapper.toResponsePage(result);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("There is no category with id %d".formatted(id)));
    }

    public Category getCategoryByName(String name) {
        return categoryRepository.findCategoryByNameIsLikeIgnoreCase(name)
                .orElseThrow(
                        ()->new EntityNotFoundException(
                                "No Category with name %s".formatted(name))
                );
    }

    public Category createCategory(CategoryRequestDto request) {
        Category category = Category.builder()
                .name(request.getName())
                .build();

        return categoryRepository.save(category);
    }

    public void removeCategory(Long id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}
