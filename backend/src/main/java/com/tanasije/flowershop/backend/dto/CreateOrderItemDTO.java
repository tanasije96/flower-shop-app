package com.tanasije.flowershop.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderItemDTO {
    private Long productId;
    private Integer quantity;
}
