package RainbowLike.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostFormDto {

    private Long memNum;
    private Long boardNum;
    private String title;
    private String content;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;
    private int pageView;
    private String consField;
    private Long parentsNum;
    private String clubAllowStatus;
    private String clubRecuStatus;

    public PostFormDto(){

    }

    public PostFormDto(String title, String content, LocalDateTime writeDate, LocalDateTime editDate, int pageView, String consField, Long parentsNum, String clubAllowStatus, String clubRecuStatus, Long memNum, Long boardNum){
//        Board board = new Board();
//        Member member = new Member();

        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.editDate = editDate;
        this.pageView = pageView;
        this.consField = consField;
        this.parentsNum = parentsNum;
        this.clubAllowStatus = clubAllowStatus;
        this.clubRecuStatus = clubRecuStatus;
        this.boardNum = boardNum;
//        board.setBoardNum(boardNum);
        this.memNum = memNum;
//        member.setMemNum(memNum);
    }


}
