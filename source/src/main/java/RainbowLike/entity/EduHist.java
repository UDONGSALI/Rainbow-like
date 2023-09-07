package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EduHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eduHistNum;

    @ManyToOne
    @JoinColumn(name = "edu_num", nullable = false)
    private Edu edu;

    @ManyToOne
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false, length = 50)
    private String  applyStatus;

}