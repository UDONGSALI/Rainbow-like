package RainbowLike;

import RainbowLike.controller.CommentController;
import RainbowLike.controller.FileController;
import RainbowLike.controller.PostController;
import RainbowLike.controller.RentHistController;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
    private PostController postController;
    @Autowired
    private CommentController commentController;
    @Autowired
    private RentHistController rentHistController;
    @Autowired
    private FileController fileController;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {
        fileController.createDefaultFiles();

        postController.createPosts();
        commentController.createComms();






    }
}

