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
public class PayHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long payHistNum;

    @ManyToOne
    @JoinColumn(name = "rent_hist_num", nullable = false)
    private RentHist rentHist;

    @Column(nullable = false)
    private int fee;

    @Column(nullable = false)
    private LocalDateTime payDate;

}
