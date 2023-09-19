package RainbowLike.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonManagedReference
    @JoinColumn(name = "ft_worker_num")
    private FtWorker ftWorker;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "ft_consumer_num")
    private FtConsumer ftConsumer;


}
