package com.tanasije.flowershop.backend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderDTO {

    private List<CreateOrderItemDTO> items;
}
