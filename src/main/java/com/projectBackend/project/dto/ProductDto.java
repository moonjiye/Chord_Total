package com.projectBackend.project.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.projectBackend.project.utils.Views;
import lombok.*;


// Frontend, Backend, Python에 대한 모든 요청/응답을 처리
@Getter
@Setter
@AllArgsConstructor //전체 생성자 자동으로
@NoArgsConstructor
@ToString
@Builder
public class ProductDto {
    @JsonView(Views.Public.class)
    private Long productId;
    @JsonView(Views.Public.class)
    private String artistName;
    private String productName;
    @JsonView(Views.Public.class)
    private String productImage;
    private String productPrice;
    private String productCategory;
    private String token;

    public ProductDto(Long productId, String artistName, String productImage) {
        this.productId = productId;
        this.artistName = artistName;
        this.productImage = productImage;
    }

//    public Product toEntity() {
//        return Product.builder()
//                .product_url(this.getProduct_url())
//                .product_name(this.getProduct_name())
//                .product_image(this.getProduct_image())
//                .product_price(this.getProduct_price())
//                .build();
//
//    }
}