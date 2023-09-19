package RainbowLike;

import RainbowLike.controller.*;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication implements CommandLineRunner {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PostController postController;
    private final CommentController commentController;
    private final RentHistController rentHistController;
    private final DefaultFileController defaultFileController;
    private final FileController fileController;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {


<<<<<<< HEAD
=======
        Post club1 = new Post(member1, board1, "소모임게시글테스트", "소모임게시글테스트용입니다. 겸사겸사 게시판과 멤버도 테스트 중입니다.", LocalDateTime.now(), 0, "허가", "모집중");
        Post club2 = new Post(member1, board2, "학원 시작하고 엄마를 한 번도 못 봤어요", "엄마보고싶어요", LocalDateTime.now(), 0, "허가", "진행중");
        Post club3 = new Post(member2, board2, "엄마는 나 안 보고 싶을 수도 있어", "사실 그럴 가능성이 더 큰 편이죠", LocalDateTime.now(), 0, "거부", "거부");
        postRepository.saveAll(Arrays.asList(club1, club2, club3));

>>>>>>> 0d3c17c (no message)

        rentHistController.createBasicRent();

        postController.createPosts();

        commentController.createComms();

        defaultFileController.createDefaultFiles();

    }
}

