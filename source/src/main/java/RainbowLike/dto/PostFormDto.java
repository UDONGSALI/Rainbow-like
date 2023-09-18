package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class PostFormDto {

    private Long memNum;
    private Member member;
    private Long boardNum;
    private Board board;
    private String title;
    private String content;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;
    private int pageView;
    private String consField;
    private Long parentsNum;
    private String clubAllowStatus;
    private String clubRecuStatus;
    private DelYN delYN;

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
        this.memNum = memNum;
    }

    static public ArrayList<PostFormDto> createTestPost() {
        ArrayList<PostFormDto> postList = new ArrayList<>();
        Board board1 = new Board();
        Board board2 = new Board();
        board1.setBoardNum(9L);
        board2.setBoardNum(8L);

        Member member1 = new Member();
        Member member2 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);


        PostFormDto post1 = new PostFormDto();
        post1.setBoard(board1);
        post1.setMember(member1);
        post1.setTitle("테스트 게시글 1");
        post1.setContent("테스트 게시글 본문 1");
        post1.setPageView(0);
        post1.setClubAllowStatus("허가");
        post1.setClubRecuStatus("모집중");
        post1.setDelYN(DelYN.N);
        postList.add(post1);

        PostFormDto post2 = new PostFormDto();
        post2.setBoard(board1);
        post2.setMember(member1);
        post2.setTitle("테스트 게시글 2");
        post2.setContent("테스트 게시글 본문 2");
        post2.setWriteDate(LocalDateTime.now());
        post2.setPageView(0);
        post2.setClubAllowStatus("허가");
        post2.setClubRecuStatus("진행중");
        post2.setDelYN(DelYN.Y);
        postList.add(post2);

        PostFormDto post3 = new PostFormDto();
        post3.setBoard(board1);
        post3.setMember(member2);
        post3.setTitle("테스트 게시글 3");
        post3.setContent("테스트 게시글 본문 3");
        post3.setWriteDate(LocalDateTime.now());
        post3.setPageView(0);
        post3.setClubAllowStatus("거부");
        post3.setClubRecuStatus("거부");
        post3.setDelYN(DelYN.N);
        postList.add(post3);


        PostFormDto post4 = new PostFormDto();
        post4.setBoard(board2);
        post4.setMember(member1);
        post4.setTitle("상담 테스트 게시글 1");
        post4.setContent("상담 테스트 게시글 본문 1");
        post4.setWriteDate(LocalDateTime.now());
        post4.setPageView(0);
        post4.setConsField("상담대기");
        post4.setDelYN(DelYN.N);
        postList.add(post4);


        PostFormDto post5 = new PostFormDto();
        post5.setBoard(board2);
        post5.setMember(member2);
        post5.setTitle("상담 테스트 게시글 2");
        post5.setContent("상담 테스트 게시글 본문 2");
        post5.setWriteDate(LocalDateTime.now());
        post5.setPageView(0);
        post5.setConsField("상담완료");
        post5.setDelYN(DelYN.Y);
        postList.add(post5);

        return postList;
    }

}
