package RainbowLike.dto;

import RainbowLike.constant.Status;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


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



    static public ArrayList<EduHistDto> creatDefaultEduHist(){
        ArrayList<EduHistDto> eduHists = new ArrayList<>();
        System.out.println("dto 동작 확인");
        for (int i = 1; i <= 6; i++) {
            for (int j = 1; j <= 4; j++) {
                EduHistDto eduHistDto = new EduHistDto();
                eduHistDto.setEduNum(Long.valueOf(j));
                eduHistDto.setMemNum(Long.valueOf(i));
                eduHistDto.setStatus(Status.WAIT);
                eduHistDto.setApplyDate(LocalDateTime.now());
                eduHists.add(eduHistDto);
            }
        }
        return eduHists;
    }
}
