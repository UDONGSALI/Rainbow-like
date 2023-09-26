package RainbowLike;

import RainbowLike.controller.*;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

<<<<<<< HEAD
@SpringBootApplication
=======
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;


>>>>>>> 0cc65cd4f373f9357e610b8b8fe67e3cbcf0c59f
@RequiredArgsConstructor
@SpringBootApplication

public class RainbowLikeApplication implements CommandLineRunner {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PostController postController;
    private final CommentController commentController;
    private final RentHistController rentHistController;
    private final EduHistController eduHistController;
    private final DefaultFileController defaultFileController;
    private final FileController fileController;
    private final FtalentController ftalentController;

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

        rentHistController.createBasicRent();

        postController.createPosts();

        commentController.createComms();

        eduHistController.createDefaultEduHists();

        defaultFileController.createDefaultFiles();

        ftalentController.createTestFtw();
        ftalentController.createTestFtc();
        ftalentController.createTestFtm();
    }
}

