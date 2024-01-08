package com.projectBackend.project.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectBackend.project.entity.Product;
import com.projectBackend.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductScheduledService {

//    @Value("${api.python.url}")
    String pythonUrl = "http://localhost:5000/api/product";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final ProductService productService;
    private final ProductRepository productRepository;

    @Scheduled(fixedRate = 6000000)
    public void productCrawling() throws JsonProcessingException {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(pythonUrl, String.class);
            String productData = response.getBody();
            log.info("product data {} :", productData);
            List<Map<String, String>> productDtoList = objectMapper.readValue(productData, new TypeReference<List<Map<String, String>>>() {
            });
            System.out.println(productDtoList);
            productRepository.deleteAll();
            for (Map<String, String> data : productDtoList) {
                Product product = new Product();
                product.setArtistName(data.get("artist"));
                product.setProductName(data.get("name"));
                product.setProductPrice(data.get("price"));
                product.setProductImage(data.get("image"));
                productRepository.save(product);
            }
            System.out.println("success!!!!!");
        } catch (Exception e) {
            System.out.println("크롤링 실패!!!!!!!!!");
        }
    }
}
