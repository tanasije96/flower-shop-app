package com.tanasije.flowershop.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {

    private Long id;
    private String name;
    private double price;
    private String imageUrl;
}