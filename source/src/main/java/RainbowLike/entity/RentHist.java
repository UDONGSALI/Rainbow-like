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
public class RentHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rentHistNum;

    @ManyToOne
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "space_num", nullable = false)
    private Space space;

    @Column(nullable = false)
    private LocalDateTime rentStdt;

    @Column(nullable = false)
    private LocalDateTime rentEddt;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false,length = 50)
    private String applyStatus;

    @Column(nullable = false,length = 50)
    private String payStatus;

}
