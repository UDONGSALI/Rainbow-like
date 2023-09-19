package RainbowLike.entity;


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
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatNum;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @Column( nullable = false)
    private LocalDateTime applyDate;

    @Column( nullable = false)
    private LocalDateTime resDate;

    @Column( nullable = false, length = 50)
    private String applyStatus;

    @Column( nullable = false)
    @Lob
    private String consContent;
}
