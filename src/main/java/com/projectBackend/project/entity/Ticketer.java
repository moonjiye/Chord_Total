package com.projectBackend.project.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "ticketer")
@Getter @Setter @ToString
@NoArgsConstructor
public class Ticketer {
    @Id
    @Column(name = "ticketer_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ticketerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performance_id", nullable = false) // 외래키
    private Performance performance; //

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // 외래키
    private Member member;



}
