package com.tanasije.flowershop.backend.dto;

import com.tanasije.flowershop.backend.model.ProductType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO {

    private Long id;
    private String name;
    private double price;
    private String imageUrl;
    private ProductType type;
}