package RainbowLike.controller;

import RainbowLike.entity.File;
import RainbowLike.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class DefaultFileController {

    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final EduRepository eduRepository;
    private final PostRepository postRepository;
    private final FileRepository fileRepository;
    public void createDefaultFiles() {

        // 기본 파일 저장용 리스트
        // 멤버 관련
        List<File> fileList = new ArrayList<>();

        File mem3File1 = new File();
        mem3File1.setMember(memberRepository.findByMemNum(3L));
        mem3File1.setFileName("member/3/상담사 자격증.jpg");
        mem3File1.setFileOriName("상담사 자격증.jpg");
        mem3File1.setFileUri("https://storage.googleapis.com/rainbow_like/member/3/상담사 자격증.jpg");

        fileList.add(mem3File1);

        File mem4File1 = new File();
        mem4File1.setMember(memberRepository.findByMemNum(4L));
        mem4File1.setFileName("member/4/노무사 자격증.jpg");
        mem4File1.setFileOriName("노무사 자격증.jpg");
        mem4File1.setFileUri("https://storage.googleapis.com/rainbow_like/member/4/노무사 자격증.jpg");

        fileList.add(mem4File1);

        File edu1File1 = new File();
        edu1File1.setEdu(eduRepository.findByEduNum(1L));
        edu1File1.setFileName("edu/1/edu1_1.png");
        edu1File1.setFileOriName("edu1_1.png");
        edu1File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/1/edu1_1.png");

        // 교육 관련

        fileList.add(edu1File1);

        File edu1File2 = new File();
        edu1File2.setEdu(eduRepository.findByEduNum(1L));
        edu1File2.setFileName("edu/1/edu1_2.png");
        edu1File2.setFileOriName("edu1_2.png");
        edu1File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/1/edu1_2.png");

        fileList.add(edu1File2);

        File edu2File1 = new File();
        edu2File1.setEdu(eduRepository.findByEduNum(2L));
        edu2File1.setFileName("edu/2/edu2_1.png");
        edu2File1.setFileOriName("edu2_1.png");
        edu2File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/2/edu2_1.png");

        fileList.add(edu2File1);

        File edu2File2 = new File();
        edu2File2.setEdu(eduRepository.findByEduNum(2L));
        edu2File2.setFileName("edu/2/edu2_2.png");
        edu2File2.setFileOriName("edu2_2.png");
        edu2File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/2/edu2_2.png");

        fileList.add(edu2File2);

        File edu3File1 = new File();
        edu3File1.setEdu(eduRepository.findByEduNum(3L));
        edu3File1.setFileName("edu/3/edu3_1.jpg");
        edu3File1.setFileOriName("edu3_1.jpg");
        edu3File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/3/edu3_1.jpg");

        fileList.add(edu3File1);

        File edu3File2 = new File();
        edu3File2.setEdu(eduRepository.findByEduNum(3L));
        edu3File2.setFileName("edu/3/edu3_2.jpg");
        edu3File2.setFileOriName("edu3_2.jpg");
        edu3File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/3/edu3_2.jpg");

        fileList.add(edu3File2);

        File edu4File1 = new File();
        edu4File1.setEdu(eduRepository.findByEduNum(4L));
        edu4File1.setFileName("edu/4/edu4_1.png");
        edu4File1.setFileOriName("edu4_1.png");
        edu4File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/4/edu4_1.png");

        fileList.add(edu4File1);

        File edu4File2 = new File();
        edu4File2.setEdu(eduRepository.findByEduNum(4L));
        edu4File2.setFileName("edu/4/edu4_1.jpg");
        edu4File2.setFileOriName("edu4_2.jpg");
        edu4File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/4/edu4_2.jpg");

        fileList.add(edu4File2);

        File post10File1 = new File();
        post10File1.setPost(postRepository.findByPostNum(10L));
        post10File1.setFileName("post/10/notice2.png");
        post10File1.setFileOriName("notice2.png");
        post10File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/10/notice2.png");

        fileList.add(post10File1);

        File post10File2 = new File();
        post10File2.setPost(postRepository.findByPostNum(10L));
        post10File2.setFileName("post/10/notice3.png");
        post10File2.setFileOriName("notice3.png");
        post10File2.setFileUri("https://storage.googleapis.com/rainbow_like/post/10/notice3.png");

        fileList.add(post10File2);

        for (File file : fileList) {
            fileRepository.save(file);
        }
    }
}
