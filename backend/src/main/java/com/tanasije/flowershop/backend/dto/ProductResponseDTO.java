package com.tanasije.flowershop.backend.dto;

import java.math.BigDecimal;

import com.tanasije.flowershop.backend.model.ProductType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO {

    private Long id;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private ProductType type;
}