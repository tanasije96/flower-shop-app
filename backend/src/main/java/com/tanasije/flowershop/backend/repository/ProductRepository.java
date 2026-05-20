package com.tanasije.flowershop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tanasije.flowershop.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
