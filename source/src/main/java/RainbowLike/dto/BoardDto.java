package RainbowLike.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;


@Getter
@Setter
public class BoardDto {


    @NotNull
    private String boardName;

    @NotBlank
    private int readRole;

    @NotBlank
    private int writeRole;

    @NotBlank
    private int editRole;

    @NotBlank
    private byte commAllowYn;


    static public ArrayList<BoardDto> createBoards() {
        ArrayList<BoardDto> boardList = new ArrayList<BoardDto>();

        BoardDto board1 = new BoardDto();
        board1.setBoardName("공지사항");
        board1.setReadRole(1);
        board1.setWriteRole(4);
        board1.setEditRole(4);
        board1.setCommAllowYn((byte) 0);

        boardList.add(board1);

        BoardDto board2 = new BoardDto();
        board2.setBoardName("언론 보도");
        board2.setReadRole(1);
        board2.setWriteRole(4);
        board2.setEditRole(4);
        board2.setCommAllowYn((byte) 0);

        boardList.add(board2);

        BoardDto board3 = new BoardDto();
        board3.setBoardName("세종시 기관 및 단체 소식");
        board3.setReadRole(1);
        board3.setWriteRole(4);
        board3.setEditRole(4);
        board3.setCommAllowYn((byte) 0);

        boardList.add(board3);

        BoardDto board4 = new BoardDto();
        board4.setBoardName("여플 소식");
        board4.setReadRole(1);
        board4.setWriteRole(4);
        board4.setEditRole(4);
        board4.setCommAllowYn((byte) 0);

        boardList.add(board4);

        BoardDto board5 = new BoardDto();
        board5.setBoardName("뉴스레터");
        board5.setReadRole(1);
        board5.setWriteRole(4);
        board5.setEditRole(4);
        board5.setCommAllowYn((byte) 0);

        boardList.add(board5);

        BoardDto board6 = new BoardDto();
        board6.setBoardName("대관 이용 후기");
        board6.setReadRole(1);
        board6.setWriteRole(4);
        board6.setEditRole(4);
        board6.setCommAllowYn((byte) 0);

        boardList.add(board6);

        BoardDto board7 = new BoardDto();
        board7.setBoardName("노무 상담 게시판");
        board7.setReadRole(1);
        board7.setWriteRole(1);
        board7.setEditRole(4);
        board7.setCommAllowYn((byte) 0);

        boardList.add(board7);

        BoardDto board8 = new BoardDto();
        board8.setBoardName("온라인 상담");
        board8.setReadRole(1);
        board8.setWriteRole(1);
        board8.setEditRole(4);
        board8.setCommAllowYn((byte) 0);

        boardList.add(board8);

        BoardDto board9 = new BoardDto();
        board9.setBoardName("모임 페이지");
        board9.setReadRole(1);
        board9.setWriteRole(1);
        board9.setEditRole(4);
        board9.setCommAllowYn((byte) 1);

        boardList.add(board9);

        return boardList;
    }
}
