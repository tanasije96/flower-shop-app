package com.tanasije.flowershop.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tanasije.flowershop.backend.dto.CreateProductDTO;
import com.tanasije.flowershop.backend.dto.ProductResponseDTO;
import com.tanasije.flowershop.backend.dto.UpdateProductDTO;
import com.tanasije.flowershop.backend.model.Product;
import com.tanasije.flowershop.backend.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(this::convertToDTO).toList();
    }

    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        return convertToDTO(product);
    }

    public ProductResponseDTO createProduct(CreateProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setType(dto.getType());

        return convertToDTO(productRepository.save(product));
    }

    public ProductResponseDTO updateProduct(Long id, UpdateProductDTO dto) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setType(dto.getType());

        return convertToDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    private ProductResponseDTO convertToDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImageUrl(product.getImageUrl());
        dto.setType(product.getType());
        
        return dto;
    }
}
