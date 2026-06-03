package com.tanasije.flowershop.backend.dto;

import com.tanasije.flowershop.backend.model.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderStatusDTO {
    private OrderStatus status;
}
