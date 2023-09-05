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
public class Edu {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eduNum;

    @Column(length = 50, nullable = false)
    private String type;

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
    private LocalDateTime recuStdt;

    @Column(nullable = false)
    private LocalDateTime recuEddt;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int recuPerson;

    @Column(nullable = false)
    private String recuMethod;

    @Column(nullable = false, length = 30)
    private String tel;
}
