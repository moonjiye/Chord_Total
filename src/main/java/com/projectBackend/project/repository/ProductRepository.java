package com.projectBackend.project.repository;

import com.projectBackend.project.dto.ProductDto;
import com.projectBackend.project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByArtistName(String artistName);

    @Query("SELECT new com.projectBackend.project.dto.ProductDto(p.productId, p.artistName, p.productImage) FROM Product p WHERE p.artistName LIKE %:keyword%")
    List<ProductDto> findByKeyword(@Param("keyword") String keyword);
}