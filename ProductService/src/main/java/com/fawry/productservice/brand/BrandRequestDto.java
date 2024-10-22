package com.fawry.productservice.brand;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;

@Value
public class BrandRequestDto implements Serializable {
@NotNull(message = "Category name cannot be null")
        @NotEmpty(message = "Category name cannot be empty")
        @NotBlank(message = "Category name cannot be blank")
        String name;
}


