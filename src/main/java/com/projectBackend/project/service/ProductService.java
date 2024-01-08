package com.projectBackend.project.service;

import com.projectBackend.project.dto.ProductDto;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Product;
import com.projectBackend.project.jwt.TokenProvider;
import com.projectBackend.project.repository.ProductRepository;
import com.projectBackend.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
//    public ProductService(ProductRepository productRepository) {
//        this.productRepository = productRepository;
//    }

    public List<ProductDto> productlist() {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setArtistName(product.getArtistName());
            productDto.setProductName(product.getProductName());
            productDto.setProductImage(product.getProductImage());
            productDto.setProductPrice(product.getProductPrice());
            productDtos.add(productDto);
        }
        return productDtos;
    }

    public List<ProductDto> getProductByArtist(String artistName) {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findAllByArtistName(artistName);
        for (Product product : products) {
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setArtistName(product.getArtistName());
            productDto.setProductName(product.getProductName());
            productDto.setProductImage(product.getProductImage());
            productDto.setProductPrice(product.getProductPrice());
            productDtos.add(productDto);
        }
        return productDtos;
    }

    public List<ProductDto> getProductByKeyword(String keyword) {
        return productRepository.findByKeyword(keyword);
    }


    // 물품 결제
    public boolean doPurchase(ProductDto productDto) {
        String email = tokenProvider.getUserEmail(productDto.getToken());
        Optional<Member> member = userRepository.findByUserEmail(email);
        int price = Integer.parseInt(productDto.getProductPrice().replace(",", ""));

        if (member.isPresent()) {
            Member user = member.get();
            System.out.println("결제 회원의 정보 : " + user);
            int point = user.getUserPoint();
            if (point >= price) {
                point = point - price;
                user.setUserPoint(point);
                userRepository.save(user);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
