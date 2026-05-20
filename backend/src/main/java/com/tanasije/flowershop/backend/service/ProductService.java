package com.tanasije.flowershop.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tanasije.flowershop.backend.dto.ProductDTO;
import com.tanasije.flowershop.backend.model.Product;
import com.tanasije.flowershop.backend.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(this::convertToDTO).toList();
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }

    public ProductDTO createTestProduct() {
    Product product = new Product();
    product.setName("Rose");
    product.setPrice(10.0);
    product.setImageUrl("test.jpg");

    Product saved = productRepository.save(product);

    return convertToDTO(saved);
}
}
