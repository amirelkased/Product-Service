package com.fawry.productservice.category;

import com.fawry.productservice.common.ResponsePage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/categories")
@RequiredArgsConstructor
public class CategoryRestController {
    private final CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<ResponsePage<Category>> getAllCategories(Pageable pageable){
        return ResponseEntity.ok(
                categoryService.getAllCategories(pageable)
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id){
        return ResponseEntity.ok(
          categoryService.getCategoryById(id)
        );
    }

    @PostMapping("")
    public ResponseEntity<Category> createCategory(@RequestBody @Validated CategoryRequestDto request){
        return ResponseEntity.ok(
            categoryService.createCategory(request)
        );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void removeCategory(@PathVariable Long id){
        categoryService.removeCategory(id);
    }
}
