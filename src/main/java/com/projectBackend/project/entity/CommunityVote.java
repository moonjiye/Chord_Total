package com.projectBackend.project.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@Table(name = "vote")
@NoArgsConstructor
public class CommunityVote {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "community_id")
    private Community community;

    @Column(name = "ip")
    private String ip;

    @Column(name = "is_upvote")
    private boolean isUpvote; // true일 경우 추천, false일 경우 비추천
    @Column(name = "userEmail")
    private String userEmail;

}