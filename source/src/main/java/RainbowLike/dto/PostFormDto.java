package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.Status;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class PostFormDto {

    private Long memNum;
    @JsonIgnore
    private Member member;
    @JsonIgnore
    private Member labor;
    private Long boardNum;
    @JsonIgnore
    private Board board;
    private String title;
    private String content;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;
    private int pageView;
    private Status conselStatus;
    private Long parentsNum;
    private Status clubAllowStatus;
    private String clubRecuStatus;
    private DelYN delYN;


    public PostFormDto(){

    }

<<<<<<< HEAD
    public PostFormDto(String title, String content, LocalDateTime writeDate, LocalDateTime editDate, int pageView, String consField, Long parentsNum, String clubAllowStatus, String clubRecuStatus, Long memNum, Long boardNum){
        Board board = new Board();
        Member member = new Member();

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

=======
>>>>>>> origin/master
    static public ArrayList<PostFormDto> createTestPost() {
        ArrayList<PostFormDto> postList = new ArrayList<>();
        Board board1 = new Board();
        Board board2 = new Board();
        Board board3 = new Board();
        Board board4 = new Board();
        Board board5 = new Board();

        board1.setBoardNum(9L);
        board2.setBoardNum(8L);
        board3.setBoardNum(1L);
        board4.setBoardNum(3L);
        board5.setBoardNum(7L);


        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);
        member3.setMemNum(3L);


        PostFormDto post1 = new PostFormDto();
        post1.setBoard(board1);
        post1.setMember(member1);
        post1.setTitle("테스트 게시글 1");
        post1.setContent("테스트 게시글 본문 1");
        post1.setPageView(0);
        post1.setClubAllowStatus(Status.APPROVE);
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
        post2.setClubAllowStatus(Status.APPROVE);
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
        post3.setClubAllowStatus(Status.REJECT);
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
        post4.setConselStatus(Status.WAIT);
        post4.setDelYN(DelYN.N);
        postList.add(post4);


        PostFormDto post5 = new PostFormDto();
        post5.setBoard(board2);
        post5.setMember(member2);
        post5.setTitle("상담 테스트 게시글 2");
        post5.setContent("상담 테스트 게시글 본문 2");
        post5.setWriteDate(LocalDateTime.now());
        post5.setPageView(0);
        post5.setConselStatus(Status.WAIT);
        post5.setDelYN(DelYN.Y);
        postList.add(post5);

        PostFormDto post6 = new PostFormDto();
        post6.setBoard(board3);
        post6.setMember(member1);
        post6.setTitle("공지사항 첫 글입니다.");
        post6.setContent("공지사항 테스트 글 입니다.");
        post6.setWriteDate(LocalDateTime.now());
        post6.setPageView(0);

        postList.add(post6);

        PostFormDto post7 = new PostFormDto();
        post7.setBoard(board3);
        post7.setMember(member1);
        post7.setTitle("공지사항 두 번째 글 입니다.");
        post7.setContent("공지사항 테스트 글 두 번째에요.<br> 안녕하세영");
        post7.setWriteDate(LocalDateTime.now());
        post7.setPageView(0);

        postList.add(post7);

        PostFormDto post8 = new PostFormDto();
        post8.setBoard(board3);
        post8.setMember(member1);
        post8.setTitle("공지사항 세 번째 글 입니다.");
        post8.setContent("공지사항 테스트 글 세 번째에요.<br>" +
              "본문의 길이를 늘려서 써본 테스트 글 입니다.<br> 오늘도 행복한 하루 되세요.<br>" );

        post8.setWriteDate(LocalDateTime.now());
        post8.setPageView(0);

        postList.add(post8);

        PostFormDto post9 = new PostFormDto();
        post9.setBoard(board3);
        post9.setMember(member1);
        post9.setTitle("공지사항 네 번째 글 입니다.");
        post9.setContent("공지사항 테스트 글 네 번째에요. 안녕하세영");
        post9.setWriteDate(LocalDateTime.now());
        post9.setPageView(0);

        postList.add(post9);

        PostFormDto post10 = new PostFormDto();
        post10.setBoard(board3);
        post10.setMember(member1);
        post10.setTitle("공지사항 다섯 번째 글 입니다.");
        post10.setContent("공지사항 테스트 글 다섯 번째에요. 글 목록을 늘려보려고 합니다.");
        post10.setWriteDate(LocalDateTime.now());
        post10.setPageView(0);

        postList.add(post10);

        PostFormDto post11 = new PostFormDto();
        post11.setBoard(board4);
        post11.setMember(member1);
        post11.setTitle("썸네일 게시판 첫 글");
        post11.setContent("썸네일 게시판 입니다.");
        post11.setWriteDate(LocalDateTime.now());
        post11.setPageView(0);

        postList.add(post11);

        PostFormDto post12 = new PostFormDto();
        post12.setBoard(board4);
        post12.setMember(member1);
        post12.setTitle("썸네일 게시판 두 번째 글");
        post12.setContent("썸네일 게시판 입니다222.");
        post12.setWriteDate(LocalDateTime.now());
        post12.setPageView(0);

        postList.add(post12);

        PostFormDto post13 = new PostFormDto();
        post13.setBoard(board4);
        post13.setMember(member1);
        post13.setTitle("썸네일 게시판 세 번쨰 글");
        post13.setContent("썸네일 게시판 입니다333.");
        post13.setWriteDate(LocalDateTime.now());
        post13.setPageView(0);

        postList.add(post13);

        PostFormDto post14 = new PostFormDto();
        post14.setBoard(board4);
        post14.setMember(member1);
        post14.setTitle("썸네일 게시판 네 번째에뇸");
        post14.setContent("썸네일 게시판 입니다.<br>444<br>444<br>");
        post14.setWriteDate(LocalDateTime.now());
        post14.setPageView(0);

        postList.add(post14);

        PostFormDto post15 = new PostFormDto();
        post15.setBoard(board4);
        post15.setMember(member1);
        post15.setTitle("썸네일 게시판 다섯 번째 글");
        post15.setContent("썸네일<br> 게시판<br> 입니다.<br>555<br>");
        post15.setWriteDate(LocalDateTime.now());
        post15.setPageView(0);

        postList.add(post15);

        PostFormDto post16 = new PostFormDto();
        post16.setBoard(board4);
        post16.setMember(member1);
        post16.setTitle("썸네일 게시판 여섯 번째 글");
        post16.setContent("썸네일 게시판 입니다.666");
        post16.setWriteDate(LocalDateTime.now());
        post16.setPageView(0);

        postList.add(post16);

        PostFormDto post17 = new PostFormDto();
        post17.setBoard(board4);
        post17.setMember(member1);
        post17.setTitle("썸네일 게시판 일곱 번째 글");
        post17.setContent("썸네일 게시판 입니다.7777");
        post17.setWriteDate(LocalDateTime.now());
        post17.setPageView(0);

        postList.add(post17);

        PostFormDto post18 = new PostFormDto();
        post18.setBoard(board5);
        post18.setMember(member2);
        post18.setTitle("노무사 게시판 유저 글1 입니다.");
        post18.setLabor(member3);
        post18.setContent("노무사 게시판 내용 입니다.");
        post18.setConselStatus(Status.COMPLETE);
        post18.setWriteDate(LocalDateTime.now());
        post18.setPageView(0);

        postList.add(post18);

        PostFormDto post19 = new PostFormDto();
        post19.setBoard(board5);
        post19.setMember(member2);
        post19.setTitle("노무사 게시판 유저 글2 입니다.");
        post19.setContent("노무사 게시판 내용2 입니다.");
        post19.setConselStatus(Status.WAIT);
        post19.setWriteDate(LocalDateTime.now());
        post19.setPageView(0);

        postList.add(post19);

        PostFormDto post20 = new PostFormDto();
        post20.setBoard(board5);
        post20.setMember(member2);
        post20.setParentsNum(18L);
        post20.setTitle("노무사 게시판  답글.");
        post20.setContent("노무사 게시판  답글 입니다.");
        post20.setWriteDate(LocalDateTime.now());
        post20.setPageView(0);

        postList.add(post20);


        return postList;
    }

}