package com.fawry.productservice.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto implements Serializable {
        @NotNull(message = "Category name cannot be null")
        @NotEmpty(message = "Category name cannot be empty")
        @NotBlank(message = "Category name cannot be blank")
        String name;
}