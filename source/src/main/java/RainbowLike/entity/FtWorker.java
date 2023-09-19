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
public class FtWorker extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ftWorkerNum;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @Column(length = 50, nullable = false)
    private String speField;

    @Column(nullable = false)
    private boolean licenseYn;

    @Column(nullable = false)
    @Lob
    private String licenseDtl;

    @Column(nullable = false)
    private String ftDtl;

    @Column(nullable = false)
    private boolean ftmYn;

    @OneToMany(mappedBy = "ftWorker", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="ftWorker-femaleTalentMatchings")
    private List<FemaleTalentMatching> femaleTalentMatchings = new ArrayList<>();

}
