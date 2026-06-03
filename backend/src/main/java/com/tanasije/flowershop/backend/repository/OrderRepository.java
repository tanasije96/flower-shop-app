package com.tanasije.flowershop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tanasije.flowershop.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
