package com.projectBackend.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "performance")
@Getter @Setter @ToString
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Performance {
    @Id
    @Column(name = "performance_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long performanceId;
    private String performanceName;

//    @OneToMany(mappedBy = "performance", orphanRemoval = true)
////    @JoinColumn(name = "user_id") // 외래키
//    private Performer performer; // 공연 참여자

    private String venue;
    private String detailVenue;
    private String performanceDate;
    private int price;
    private String description;
    private int seatCount;
    private String performanceImage;


}
