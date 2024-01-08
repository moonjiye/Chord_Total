package com.projectBackend.project.controller;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.extern.slf4j.Slf4j;
import com.projectBackend.project.dto.ProductDto;
import com.projectBackend.project.service.ProductService;
import com.projectBackend.project.utils.Views;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static com.projectBackend.project.utils.Common.CORS_ORIGIN;

@Slf4j
@RestController
@RequestMapping("/product")
@CrossOrigin(origins = CORS_ORIGIN)
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // -
    @GetMapping("/productlist")
    public ResponseEntity<List<ProductDto>> productBack(){
        List<ProductDto> list = productService.productlist();
        // 상태코드 200(ok)와 함께 데이터를 반환
        return ResponseEntity.ok(list);
    }

    // -
    @GetMapping("/productlist/{artist}")
    public ResponseEntity<List<ProductDto>> getProductsByArtist(@PathVariable String artist){
        List<ProductDto> list = productService.getProductByArtist(artist);
        // 상태코드 200(ok)와 함께 데이터를 반환
        return ResponseEntity.ok(list);
    }

    // -
    @GetMapping("/search")
    @JsonView(Views.Public.class)
    public ResponseEntity<List<ProductDto>> getSearchView(@RequestParam String keyword) {
        try {
            List<ProductDto> productDtos = productService.getProductByKeyword(keyword);
            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/purchase")
    public ResponseEntity<Boolean> purchase(@RequestBody ProductDto productDto) {
        return ResponseEntity.ok(productService.doPurchase(productDto));
    }

}
