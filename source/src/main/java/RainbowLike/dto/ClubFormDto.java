package RainbowLike.dto;

import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ClubFormDto {
    private Member member;
    private Board board;
    private String title;
    private String content;
    private LocalDateTime writeDate;
    private int pageView;
    private String clubAllowStatus;
    private String clubRecuStatus;

    public ClubFormDto(){

    }

}
