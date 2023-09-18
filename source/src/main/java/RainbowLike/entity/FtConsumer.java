package RainbowLike.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class FtConsumer extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ftConsumerNum;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @Column(length = 50, nullable = false)
    private String speField;

    @Column(nullable = false)
    @Lob
    private String applyContent;

    @Column(nullable = false)
    private boolean ftmYn;


    @OneToMany(mappedBy = "ftConsumer", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<FemaleTalentMatching> femaleTalentMatchings = new ArrayList<>();
}
