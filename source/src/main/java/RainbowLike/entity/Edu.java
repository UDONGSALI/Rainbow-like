package RainbowLike.entity;

import RainbowLike.constant.EduType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Edu {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eduNum;

    @Column(length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private EduType type;

    @Column(nullable = false)
    private String eduname;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private LocalDateTime eduStdt;

    @Column(nullable = false)
    private LocalDateTime eduEddt;

    @Column(nullable = false)
    private String eduAddr;

    @Column(nullable = false)
    private String target;

    @Column(nullable = false)
    private LocalDate recuStdt;

    @Column(nullable = false)
    private LocalDate recuEddt;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int recuPerson;

    @Column(nullable = false)
    private String recuMethod;

    @Column(nullable = false, length = 30)
    private String tel;
}
