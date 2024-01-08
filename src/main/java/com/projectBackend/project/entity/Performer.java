package com.projectBackend.project.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "performer")
@Getter @Setter @ToString
@NoArgsConstructor
public class Performer {
    @Id
    @Column(name = "performer_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long performerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performance_id", nullable = false) // 외래키
    private Performance performance; //

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // 외래키
    private Member member;



}
