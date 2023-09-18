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
public class RentHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rentHistNum;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @ManyToOne
    @JsonManagedReference
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

    @OneToMany(mappedBy = "rentHist", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<PayHist> payHists = new ArrayList<>();


    public RentHist(Member member, Space space, LocalDateTime rentStdt, LocalDateTime rentEddt, LocalDateTime applyDate, String applyStatus, String payStatus){
        super();
        this.member=member;
        this.space=space;
        this.rentStdt=rentStdt;
        this.rentEddt=rentEddt;
        this.applyDate=applyDate;
        this.payStatus=payStatus;


    }
}
