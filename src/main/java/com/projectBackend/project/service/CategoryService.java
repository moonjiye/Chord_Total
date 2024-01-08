package com.projectBackend.project.service;

import com.projectBackend.project.dto.CommunityCategoryDTO;
import com.projectBackend.project.entity.CommunityCategory;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.repository.CommunityCategoryRepository;
import com.projectBackend.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CommunityCategoryRepository categoryRepository;
    private final UserRepository memberRepository;
    // 카테고리 등록
    public boolean saveCategory(CommunityCategoryDTO categoryDTO){
        try {
            CommunityCategory category = new CommunityCategory();
            Member member = memberRepository.findByUserEmail(categoryDTO.getEmail()).orElseThrow(
                    ()-> new RuntimeException("해당 회원이 존재 하지 않습니다.")
            );
            category.setCategoryName(categoryDTO.getCategoryName());
            category.setMember(member);
            categoryRepository.save(category);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    // 카테고리 수정
    public boolean modifyCategory(Long id, CommunityCategoryDTO categoryDTO){
        try {
            CommunityCategory category = categoryRepository.findById(id).orElseThrow(
                    ()-> new RuntimeException("해당 카테고리가 존재하지 않습니다.")
            );
            Member member = memberRepository.findByUserEmail(categoryDTO.getEmail()).orElseThrow(
                    ()-> new RuntimeException("해당 회원이 존재하지 않습니다")
            );
            category.setCategoryName(categoryDTO.getCategoryName());
            category.setCategoryId(categoryDTO.getCategoryId());
            category.setMember(member);
            categoryRepository.save(category);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    // 카테고리 삭제
    public boolean deleteCategory(Long id){
        try {
            CommunityCategory category = categoryRepository.findById(id).orElseThrow(
                    ()-> new RuntimeException("해당 카테고리가 존재하지 않습니다.")
            );
            categoryRepository.delete(category);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 카테고리 목록 조회
    public List<CommunityCategoryDTO> getCategoryList() {
        List<CommunityCategory> categories = categoryRepository.findAll();
        List<CommunityCategoryDTO> categoryDTOS = new ArrayList<>();
        for(CommunityCategory category : categories) {
            categoryDTOS.add(convertEntityToDto(category));
        }
        return categoryDTOS;
    }

    // 엔티티를 DTO로 변환하는 메서드
    private CommunityCategoryDTO convertEntityToDto(CommunityCategory category) {
        CommunityCategoryDTO categoryDto = new CommunityCategoryDTO();
        categoryDto.setCategoryId(category.getCategoryId());
        categoryDto.setCategoryName(category.getCategoryName());
        categoryDto.setEmail(category.getMember().getUserEmail());
        return categoryDto;
    }
}
