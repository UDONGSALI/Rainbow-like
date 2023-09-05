package RainbowLike.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FemaleTalentMatching {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ftmNum;

    @ManyToOne
    @JoinColumn(name = "ft_worker_num")
    private FtWorker ftWorker;

    @ManyToOne
    @JoinColumn(name = "ft_consumer_num")
    private FtConsumer ftConsumer;


}
