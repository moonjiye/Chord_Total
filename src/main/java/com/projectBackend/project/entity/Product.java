package com.projectBackend.project.entity;

import com.projectBackend.project.dto.ProductDto;
import io.swagger.annotations.Contact;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "product")
@Getter
@Setter
@ToString
//@Builder
public class Product {

    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "product_seq")
    private Long productId;
    private String artistName;
    private String productName;
    private String productImage;
    private String productPrice;
    private String productCategory;


    // 추후 빌더패턴 적용시 사용
//    public ProductDto toDto() {
//        return ProductDto.builder()
//                .product_url(this.getProduct_Url())
//                .product_name(this.getProduct_name())
//                .product_image(this.getProduct_image())
//                .product_price(this.getProduct_price())
//                .build();
//    }
}
