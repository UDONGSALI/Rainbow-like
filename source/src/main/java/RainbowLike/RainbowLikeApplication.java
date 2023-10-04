package RainbowLike;

import RainbowLike.controller.*;
import RainbowLike.service.EduHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication implements CommandLineRunner {


    private final PostController postController;
    private final CommentController commentController;
    private final RentHistController rentHistController;
    private final EduHistService eduHistService;
    private final DefaultFileController defaultFileController;
    private final FtalentController ftalentController;
    private final SmsController smsController;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {

        rentHistController.createBasicRent();

        postController.createPosts();

        commentController.createComms();

        eduHistService.createDefaultEduHists();

        defaultFileController.createDefaultFiles();

        ftalentController.createTestFtw();
        ftalentController.createTestFtc();
        ftalentController.createTestFtm();

        smsController.createTestSms();
    }
}

