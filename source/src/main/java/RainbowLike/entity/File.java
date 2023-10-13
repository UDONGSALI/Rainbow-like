package RainbowLike.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long fileNum;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "post_num", nullable=true)
    private Post post;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "edu_num")
    private Edu edu;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "eduHist_num")
    private EduHist eduHist;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "space_num")
    private Space space;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileOriName;

    @Column(nullable = false)
    private String  fileUri;
}
