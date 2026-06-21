package com.tanasije.flowershop.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tanasije.flowershop.backend.dto.CreateOrderItemDTO;
import com.tanasije.flowershop.backend.dto.OrderItemResponseDTO;
import com.tanasije.flowershop.backend.dto.OrderResponseDTO;
import com.tanasije.flowershop.backend.model.Order;
import com.tanasije.flowershop.backend.model.OrderItem;
import com.tanasije.flowershop.backend.model.OrderStatus;
import com.tanasije.flowershop.backend.model.Product;
import com.tanasije.flowershop.backend.repository.OrderRepository;
import com.tanasije.flowershop.backend.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderResponseDTO createOrder(List<CreateOrderItemDTO> items) {
        if (items == null || items.isEmpty()) {
            throw new RuntimeException("Order must have at least one item");
        }

        Order order = new Order();
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CreateOrderItemDTO itemDTO : items) {

            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemDTO.getProductId()));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemDTO.getQuantity());
            item.setPriceAtPurchase(product.getPrice());

            BigDecimal itemTotal = item.getPriceAtPurchase()
                    .multiply(BigDecimal.valueOf(item.getQuantity()));

            total = total.add(itemTotal);

            orderItems.add(item);
        }

        order.setItems(orderItems);
        order.setTotalItems(orderItems.size());
        order.setTotalPrice(total);

        Order saved = orderRepository.save(order);

        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public OrderResponseDTO getOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToDTO(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public OrderResponseDTO updateStatus(Long id, OrderStatus newStatus) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));

        order.setStatus(newStatus);

        Order saved = orderRepository.save(order);

        return mapToDTO(saved);
    }

    private OrderResponseDTO mapToDTO(Order order) {

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());

        List<OrderItemResponseDTO> itemDTOs = order.getItems()
                .stream()
                .map(this::mapItemToDTO)
                .toList();

        dto.setItems(itemDTOs);
        Integer totalItems = order.getItems().stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();

        dto.setTotalItems(totalItems);

        return dto;
    }

    private OrderItemResponseDTO mapItemToDTO(OrderItem item) {

        OrderItemResponseDTO dto = new OrderItemResponseDTO();

        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPriceAtPurchase(item.getPriceAtPurchase());

        return dto;
    }
}
