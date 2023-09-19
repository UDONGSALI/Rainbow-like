package RainbowLike;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.controller.*;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;


@RequiredArgsConstructor
@SpringBootApplication

public class RainbowLikeApplication implements CommandLineRunner {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PostController postController;
    private final CommentController commentController;
    private final RentHistController rentHistController;
    private final DefaultFileController defaultFileController;
    private final FileController fileController;

    public RainbowLikeApplication(BoardRepository boardRepository, MemberRepository memberRepository, PostRepository postRepository, PostController postController, CommentController commentController, RentHistController rentHistController, DefaultFileController defaultFileController, FileController fileController) {

        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
        this.postController = postController;
        this.commentController = commentController;
        this.rentHistController = rentHistController;
        this.defaultFileController = defaultFileController;
        this.fileController = fileController;
    }

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("일단 이게 되긴 하는지");

        Board board1 = new Board("Club", true, true, true);
        Board board2 = new Board("Test", true, false, false);
        boardRepository.saveAll(Arrays.asList(board1, board2));

        Member member1 = new Member("test1", "$2a$10$HX32zW6s/T1EvnnSDlKcde1uMtvkF/mq8qSf8XLv5PdBN26tT6YUG", Type.USER, "김유저", Gender.FEMALE, LocalDate.of(2023, 01, 01), "010-1111-1111", "test1@test.com", "대전 서구", "둔산서로 17", LocalDate.now());
        Member member2 = new Member("test2", "$2a$10$avDcExXAMm7U.tezpQsF9uaAKYsh4fb.kAAvdVdxgqeNbfiwro1Uq", Type.USER, "박유저", Gender.MALE, LocalDate.of(2023, 01, 01), "010-2222-2222", "test2@test.com", "대전 서구", "양호빌딩", LocalDate.now());
        memberRepository.saveAll(Arrays.asList(member1, member2));


        Post club1 = new Post(member1, board1, "소모임게시글테스트", "소모임게시글테스트용입니다. 겸사겸사 게시판과 멤버도 테스트 중입니다.", LocalDateTime.now(), 0, "허가", "모집중");
        Post club2 = new Post(member1, board2, "학원 시작하고 엄마를 한 번도 못 봤어요", "엄마보고싶어요", LocalDateTime.now(), 0, "허가", "진행중");
        Post club3 = new Post(member2, board2, "엄마는 나 안 보고 싶을 수도 있어", "사실 그럴 가능성이 더 큰 편이죠", LocalDateTime.now(), 0, "거부", "거부");
        postRepository.saveAll(Arrays.asList(club1, club2, club3));

        defaultFileController.createDefaultFiles();

        rentHistController.createBasicRent();

        postController.createPosts();

        commentController.createComms();


    }
}

