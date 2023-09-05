package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SmsRecepTel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long smsRecepTelNum;

    @ManyToOne
    @JoinColumn(name = "sms_hist_num", nullable = false)
    private SmsHist smsHist;

    @Column(nullable = false)
    private String recepTel;
}
