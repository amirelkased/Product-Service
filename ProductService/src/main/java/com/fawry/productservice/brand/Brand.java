package com.fawry.productservice.brand;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fawry.productservice.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @OneToMany(mappedBy = "brand")
    @JsonBackReference
    private List<Product> products;
}
