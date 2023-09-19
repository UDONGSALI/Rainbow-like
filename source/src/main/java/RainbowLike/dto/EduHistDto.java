package RainbowLike.dto;

import RainbowLike.constant.Status;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class EduHistDto {


    private Long eduNum;

    private Long memNum;
    @JsonIgnore
    private Edu edu;
    @JsonIgnore
    private Member member;

    private LocalDateTime applyDate;

    private Status status;

}
