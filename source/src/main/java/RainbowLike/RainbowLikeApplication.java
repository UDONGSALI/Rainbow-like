package RainbowLike;

import RainbowLike.controller.*;
import RainbowLike.service.DefaultFileService;
import RainbowLike.service.EduHistService;
import RainbowLike.service.PostService;
import RainbowLike.service.RentHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication implements CommandLineRunner {

    private final PostService postService;
    private final CommentController commentController;
    private final RentHistService rentHistService;
    private final EduHistService eduHistService;
    private final DefaultFileService defaultFileService;
    private final FtalentController ftalentController;
    private final SmsController smsController;
    private final CbotController cbotController;
    private final ChatController chatController;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {

        rentHistService.createBasicRent();

        postService.createDefaultPosts();

        commentController.createComms();

        eduHistService.createDefaultEduHists();

        defaultFileService.createDefaultFiles();

        ftalentController.createTestFtw();
        ftalentController.createTestFtc();
        ftalentController.createTestFtm();

        smsController.createTestSms();

        cbotController.createQnA();
        chatController.createTestChat();
    }
}

