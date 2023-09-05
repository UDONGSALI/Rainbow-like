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
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long spaceNum;

    @Column(nullable = false, length = 50)
    private String spaceName;

    @Column(nullable = false)
    private String spaceUsage;

    @Column(nullable = false)
    private LocalDateTime rentTime;

    @Column(nullable = false)
    private int rentFee;

    @Column(nullable = false)
    private String facilities;


}
