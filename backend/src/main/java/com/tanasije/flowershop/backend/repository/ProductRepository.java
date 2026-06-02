package com.tanasije.flowershop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tanasije.flowershop.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsDeletedFalse();
}
