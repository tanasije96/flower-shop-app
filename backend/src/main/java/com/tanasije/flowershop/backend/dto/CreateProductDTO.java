package com.tanasije.flowershop.backend.dto;

import com.tanasije.flowershop.backend.model.ProductType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProductDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be 2–50 characters")
    private String name;

    @Positive(message = "Price must be greater than 0")
    private double price;

    private String imageUrl;

    @NotNull(message = "Product type is required")
    private ProductType type;
}