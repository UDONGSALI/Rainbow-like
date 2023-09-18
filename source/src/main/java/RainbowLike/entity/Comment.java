package RainbowLike.entity;

import RainbowLike.constant.DelYN;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commNum;

    @ManyToOne
    @JoinColumn(name = "post_num", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column
    private Long parentNum;

    @Column
    private DelYN delYN;


}
