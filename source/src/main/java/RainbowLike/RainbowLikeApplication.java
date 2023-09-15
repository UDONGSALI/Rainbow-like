package RainbowLike;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.controller.DefaultFileController;
import RainbowLike.controller.FileController;
import RainbowLike.controller.RentHistController;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.FileRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication implements CommandLineRunner {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private DefaultFileController defaultFileController;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("일단 이게 되긴 하는지");

        Board board1 = new Board();
        Board board2 = new Board();
        board1.setBoardNum(9L);
        board1.setBoardNum(8L);

        Member member1 = new Member();
        Member member2 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);


<<<<<<< HEAD

        Post club1 = new Post(member1, board1, "소모임게시글테스트", "테스트 게시글 1", LocalDateTime.now(), 0, "허가", "모집중");
        Post club2 = new Post(member1, board2, "테스트게시글2", "테스트 본문 2", LocalDateTime.now(), 0, "허가", "진행중");
        Post club3 = new Post(member2, board2, "테스트 게시글 3", "본문3", LocalDateTime.now(), 0, "거부", "거부");
=======
        Post club1 = new Post(member1, board1, "소모임게시글테스트", "소모임게시글테스트용입니다. 겸사겸사 게시판과 멤버도 테스트 중입니다.", LocalDateTime.now(), 0, "허가", "모집중");
        Post club2 = new Post(member1, board2, "학원 시작하고 엄마를 한 번도 못 봤어요", "엄마보고싶어요", LocalDateTime.now(), 0, "허가", "진행중");
        Post club3 = new Post(member2, board2, "엄마는 나 안 보고 싶을 수도 있어", "사실 그럴 가능성이 더 큰 편이죠", LocalDateTime.now(), 0, "거부", "거부");
>>>>>>> e1c2fa4cefa80d3884e1c2dab03cd89e0b65e8c4
        postRepository.saveAll(Arrays.asList(club1, club2, club3));

        defaultFileController.createDefaultFiles();



        rentHistController.createBasicRent();
    }
}

