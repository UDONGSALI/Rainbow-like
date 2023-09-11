package RainbowLike.entity;

import RainbowLike.dto.SpaceDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @Column(nullable =false)
    private int maxPerson;

    @Column(nullable = false)
    private String spaceUsage;

    @Column(nullable = false)
    private String rentTime;

    @Column(nullable = false)
    private String rentFee;

    @Column(nullable = false)
    private String facilities;

    public Space(String spaceName, int maxPerson, String spaceUsage,String rentTime, String rentFee, String facilities){
        super();
        this.spaceName=spaceName;
        this.maxPerson=maxPerson;
        this.spaceUsage=spaceUsage;
        this.rentTime=rentTime;
        this.rentFee=rentFee;
        this.facilities=facilities;

    }


}
