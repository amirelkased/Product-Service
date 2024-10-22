package com.fawry.productservice.product;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fawry.productservice.brand.Brand;
import com.fawry.productservice.category.Category;
import com.fawry.productservice.common.EntityAuditing;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@SuperBuilder
public class Product extends EntityAuditing {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false, updatable = false, unique = true, length = 8)
    private String sku;
    @Column(length = 80, nullable = false)
    private String title;
    private String description;
    private double price;
    private String imageUrl;
    @Enumerated(EnumType.STRING)
    private ProductStatus status;
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    private Category category;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    @JsonManagedReference
    private Brand brand;
}

