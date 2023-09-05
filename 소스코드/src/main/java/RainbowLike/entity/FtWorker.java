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
public class FtWorker {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ftWorkerNum;

    @ManyToOne
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
    private LocalDateTime writeDate;

    @Column(nullable = false)
    private LocalDateTime editDate;

    @Column(nullable = false)
    private boolean ftmYn;
}
