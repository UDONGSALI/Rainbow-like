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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memNum;

    @Column(unique = true, length = 50, nullable = false)
    private String memId;

    @Column(nullable = false,length = 100)
    private String pwd;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(nullable = false)
    private LocalDateTime bir;

    @Column(nullable = false, length = 30)
    private String tel;

    @Column(unique = true, nullable = false,length = 100)
    private String email;

    @Column(nullable = false)
    private String addr;

    private String addrDtl;

    @Column(nullable = false)
    private LocalDateTime jdate;


}
