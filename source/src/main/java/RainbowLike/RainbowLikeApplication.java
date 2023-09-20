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

@SpringBootApplication
@RequiredArgsConstructor
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

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {

        rentHistController.createBasicRent();

        postController.createPosts();

        commentController.createComms();

//        eduHistController.createDefaultEduHists();

        defaultFileController.createDefaultFiles();
    }
}

