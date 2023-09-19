package RainbowLike.entity;

import RainbowLike.constant.Status;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    @JoinColumn(name = "edu_num", nullable = false)
    private Edu edu;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Status status;

}
