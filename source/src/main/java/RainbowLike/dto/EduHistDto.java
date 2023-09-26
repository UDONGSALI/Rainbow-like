package RainbowLike.dto;

import RainbowLike.constant.Status;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;


@Getter
@Setter
public class EduHistDto {


    private Long eduNum;

    private Long memNum;
    @JsonIgnore
    private Edu edu;
    @JsonIgnore
    private Member member;

    private boolean portraitRights;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime applyDate;

    private Status status;



    static public ArrayList<EduHistDto> creatDefaultEduHist(){
        ArrayList<EduHistDto> eduHists = new ArrayList<>();
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 4; j++) {
                EduHistDto eduHistDto = new EduHistDto();
                eduHistDto.setEduNum(Long.valueOf(j));
                eduHistDto.setMemNum(Long.valueOf(i));
                eduHistDto.setStatus(Status.APPROVE);
                eduHistDto.setApplyDate(LocalDateTime.now());
                eduHists.add(eduHistDto);
            }
        }
        return eduHists;
    }
}
