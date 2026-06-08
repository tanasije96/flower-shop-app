package com.tanasije.flowershop.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tanasije.flowershop.backend.dto.CreateOrderDTO;
import com.tanasije.flowershop.backend.dto.OrderResponseDTO;
import com.tanasije.flowershop.backend.dto.UpdateOrderStatusDTO;
import com.tanasije.flowershop.backend.service.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderResponseDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);
    }

    @PostMapping
    public OrderResponseDTO createOrder(@RequestBody @Valid CreateOrderDTO dto) {
        return orderService.createOrder(dto.getItems());
    }

    @PatchMapping("/{id}/status")
    public OrderResponseDTO updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateOrderStatusDTO dto) {
        return orderService.updateStatus(id, dto.getStatus());
    }

    /* @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }*/
}
