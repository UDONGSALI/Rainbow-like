package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.nio.file.Path;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long fileNum;

    @ManyToOne
    @JoinColumn(name = "post_num")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "edu_num")
    private Edu edu;

    @ManyToOne
    @JoinColumn(name = "space_num")
    private Space space;

    @ManyToOne
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileOriName;

    @Column(nullable = false)
    private String  fileUri;
}
