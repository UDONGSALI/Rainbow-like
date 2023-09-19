package RainbowLike.entity;

<<<<<<< HEAD
import RainbowLike.constant.DelYN;
=======
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
>>>>>>> 0227f31bf94db2499a7c6e6bd711a4f44586e2c4
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postNum;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    @JoinColumn(name = "mem_num")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    @JoinColumn(name = "board_num")
    private Board board;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private int pageView;

    @Column(length = 50)
    private String consField;

    @Column
    private Long parentsNum;

    @Column(length = 50)
    private String clubAllowStatus;

    @Column(length = 50)
    private String clubRecuStatus;

<<<<<<< HEAD
    @Column
    private DelYN delYN;
=======
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="post-files")
    private List<File> files = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="post-comments")
    private List<Comment> comments = new ArrayList<>();
>>>>>>> 0227f31bf94db2499a7c6e6bd711a4f44586e2c4

    public Post(Member member, Board board, String title, String content, LocalDateTime writeDate, int pageView, String clubAllowStatus, String clubRecuStatus) {
        super();
        this.member = member;
        this.board = board;
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.pageView = pageView;
        this.clubAllowStatus = clubAllowStatus;
        this.clubRecuStatus = clubRecuStatus;


    }
}