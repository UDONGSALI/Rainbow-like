package RainbowLike.dto;

import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class PostDto {

    private static MemberRepository memberRepository;
    private static BoardRepository boardRepository;

    private Long memNum;
    private Long boardNum;
    private Member member;
    private Board board;
    private String title;
    private LocalDateTime writeDate;
    private String content;
    private int pageView;

    public PostDto() {
    }

    public PostDto(Long memNum, Long boardNum, Member member, Board board, String title, LocalDateTime writeDate, String content, int pageView) {
        this.memNum = memNum;
        this.boardNum = boardNum;
        this.member = member;
        this.board = board;
        this.title = title;
        this.writeDate = writeDate;
        this.content = content;
        this.pageView = pageView;
    }

    public static ArrayList<PostDto> createPost() {
        ArrayList<PostDto> postList = new ArrayList<>();

        Member member1 = memberRepository.findByMemNum(1L);
        Board board1 = boardRepository.findByBoardNum(1L);

        LocalDateTime writeDate1 = LocalDateTime.now();



        return postList;
    }
}
