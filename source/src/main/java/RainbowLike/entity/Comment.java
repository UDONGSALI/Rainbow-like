package RainbowLike.entity;

<<<<<<< HEAD
import RainbowLike.constant.DelYN;
=======
import com.fasterxml.jackson.annotation.JsonManagedReference;
>>>>>>> 0227f31bf94db2499a7c6e6bd711a4f44586e2c4
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
    @JsonManagedReference
    @JoinColumn(name = "post_num", nullable = false)
    private Post post;

    @ManyToOne
    @JsonManagedReference
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
