package RainbowLike.service;

import RainbowLike.entity.File;
import RainbowLike.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DefaultFileService {

    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final EduRepository eduRepository;
    private final EduHistRepository eduHistRepository;
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

        File edu5File1 = new File();
        edu5File1.setEdu(eduRepository.findByEduNum(5L));
        edu5File1.setFileName("edu/5/edu5_1.png");
        edu5File1.setFileOriName("edu5_1.png");
        edu5File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/5/edu5_1.png");

        fileList.add(edu5File1);

        File edu5File2 = new File();
        edu5File2.setEdu(eduRepository.findByEduNum(5L));
        edu5File2.setFileName("edu/5/edu5_2.png");
        edu5File2.setFileOriName("edu5_2.png");
        edu5File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/5/edu5_2.png");

        fileList.add(edu5File2);

        File edu6File1 = new File();
        edu6File1.setEdu(eduRepository.findByEduNum(6L));
        edu6File1.setFileName("edu/6/edu6_1.png");
        edu6File1.setFileOriName("edu6_1.png");
        edu6File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/6/edu6_1.png");

        fileList.add(edu6File1);

        File edu6File2 = new File();
        edu6File2.setEdu(eduRepository.findByEduNum(6L));
        edu6File2.setFileName("edu/6/edu6_2.png");
        edu6File2.setFileOriName("edu6_2.png");
        edu6File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/6/edu6_2.png");

        fileList.add(edu6File2);

        File edu7File1 = new File();
        edu7File1.setEdu(eduRepository.findByEduNum(7L));
        edu7File1.setFileName("edu/7/edu7_1.jpg");
        edu7File1.setFileOriName("edu7_1.jpg");
        edu7File1.setFileUri("https://storage.googleapis.com/rainbow_like/edu/7/edu7_1.jpg");

        fileList.add(edu7File1);

        File edu7File2 = new File();
        edu7File2.setEdu(eduRepository.findByEduNum(7L));
        edu7File2.setFileName("edu/7/edu7_2.jpg");
        edu7File2.setFileOriName("edu7_2.jpg");
        edu7File2.setFileUri("https://storage.googleapis.com/rainbow_like/edu/7/edu7_2.jpg");

        fileList.add(edu7File2);

        // 게시글 관련

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

        File post11File1 = new File();
        post11File1.setPost(postRepository.findByPostNum(11L));
        post11File1.setFileName("post/11/notice4.png");
        post11File1.setFileOriName("notice4.png");
        post11File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/11/notice4.png");

        fileList.add(post11File1);

        File post12File1 = new File();
        post12File1.setPost(postRepository.findByPostNum(12L));
        post12File1.setFileName("post/12/notice1.png");
        post12File1.setFileOriName("notice1.png");
        post12File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/12/notice1.jpg");

        fileList.add(post12File1);

        File post13File1 = new File();
        post13File1.setPost(postRepository.findByPostNum(13L));
        post13File1.setFileName("post/13/sj2.png");
        post13File1.setFileOriName("sj2.png");
        post13File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/13/sj2.png");

        fileList.add(post13File1);

        File post14File1 = new File();
        post14File1.setPost(postRepository.findByPostNum(14L));
        post14File1.setFileName("post/14/sj3.jpg");
        post14File1.setFileOriName("sj3.jpg");
        post14File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/14/sj3.jpg");

        fileList.add(post14File1);

        File post15File1 = new File();
        post15File1.setPost(postRepository.findByPostNum(15L));
        post15File1.setFileName("post/15/sj4.jpg");
        post15File1.setFileOriName("sj4.jpg");
        post15File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/15/sj4.jpg");

        fileList.add(post15File1);

        File post16File1 = new File();
        post16File1.setPost(postRepository.findByPostNum(16L));
        post16File1.setFileName("post/16/sj5_1.jpg");
        post16File1.setFileOriName("sj5_1.jpg");
        post16File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/16/sj5_1.jpg");
        fileList.add(post16File1);


        File post16File2 = new File();
        post16File2.setPost(postRepository.findByPostNum(16L));
        post16File2.setFileName("post/16/sj5_2.jpg");
        post16File2.setFileOriName("sj5_2.jpg");
        post16File2.setFileUri("https://storage.googleapis.com/rainbow_like/post/16/sj5_2.jpg");

        fileList.add(post16File2);


        File post16File3 = new File();
        post16File3.setPost(postRepository.findByPostNum(16L));
        post16File3.setFileName("post/16/sj5_3.jpg");
        post16File3.setFileOriName("sj5_3.jpg");
        post16File3.setFileUri("https://storage.googleapis.com/rainbow_like/post/16/sj5_3.jpg");

        fileList.add(post16File3);

        File post17File1 = new File();
        post17File1.setPost(postRepository.findByPostNum(17L));
        post17File1.setFileName("post/17/sj6.jpg");
        post17File1.setFileOriName("sj6.jpg");
        post17File1.setFileUri("https://storage.googleapis.com/rainbow_like/post/17/sj6.jpg");

        fileList.add(post17File1);

        // 교육 내역 관련

        File eduHist1File1 = new File();
        eduHist1File1.setEduHist(eduHistRepository.findByEduHistNum(1L));
        eduHist1File1.setFileName("eduHist/1/참새.jfif");
        eduHist1File1.setFileOriName("참새.jfif");
        eduHist1File1.setFileUri("https://storage.googleapis.com/rainbow_like/eduHist/1/참새.jfif");

        fileList.add(eduHist1File1);

        File eduHist1File2 = new File();
        eduHist1File2.setEduHist(eduHistRepository.findByEduHistNum(1L));
        eduHist1File2.setFileName("eduHist/1/나가.jpg");
        eduHist1File2.setFileOriName("나가.jpg");
        eduHist1File2.setFileUri("https://storage.googleapis.com/rainbow_like/eduHist/1/나가.jpg");

        fileList.add(eduHist1File2);

        File eduHist4File1 = new File();
        eduHist4File1.setEduHist(eduHistRepository.findByEduHistNum(4L));
        eduHist4File1.setFileName("eduHist/4/테스트.xlsx");
        eduHist4File1.setFileOriName("테스트.xlsx");
        eduHist4File1.setFileUri("https://storage.googleapis.com/rainbow_like/eduHist/4/테스트.xlsx");

        fileList.add(eduHist4File1);
        //공간 관련 이미지

        File space1File1 = new File();
        space1File1.setSpace(spaceRepository.findBySpaceNum(1L));
        space1File1.setFileName("space/1/space1.jpg");
        space1File1.setFileOriName("space1.jpg");
        space1File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/1/space1.jpg");

        fileList.add(space1File1);

        File space2File1 = new File();
        space2File1.setSpace(spaceRepository.findBySpaceNum(2L));
        space2File1.setFileName("space/2/space2.jpg");
        space2File1.setFileOriName("space2.jpg");
        space2File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/2/space2.jpg");

        fileList.add(space2File1);

        File space3File1 = new File();
        space3File1.setSpace(spaceRepository.findBySpaceNum(3L));
        space3File1.setFileName("space/3/space3.jpg");
        space3File1.setFileOriName("space3.jpg");
        space3File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/3/space3.jpg");

        fileList.add(space3File1);


        File space4File1 = new File();
        space4File1.setSpace(spaceRepository.findBySpaceNum(4L));
        space4File1.setFileName("space/4/space4.jpg");
        space4File1.setFileOriName("space4.jpg");
        space4File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/4/space4.jpg");

        fileList.add(space4File1);

        File space5File1 = new File();
        space5File1.setSpace(spaceRepository.findBySpaceNum(5L));
        space5File1.setFileName("space/5/space5.jpg");
        space5File1.setFileOriName("space5.jpg");
        space5File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/5/space5.jpg");

        fileList.add(space5File1);

        File space6File1 = new File();
        space6File1.setSpace(spaceRepository.findBySpaceNum(6L));
        space6File1.setFileName("space/6/space6.jpg");
        space6File1.setFileOriName("space6.jpg");
        space6File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/6/space6.jpg");

        fileList.add(space6File1);

        File space7File1 = new File();
        space7File1.setSpace(spaceRepository.findBySpaceNum(7L));
        space7File1.setFileName("space/7/space7.jpg");
        space7File1.setFileOriName("space7.jpg");
        space7File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/7/space7.jpg");

        fileList.add(space7File1);

        File space8File1 = new File();
        space8File1.setSpace(spaceRepository.findBySpaceNum(8L));
        space8File1.setFileName("space/8/space8.jpg");
        space8File1.setFileOriName("space8.jpg");
        space8File1.setFileUri("https://storage.googleapis.com/rainbow_like/space/8/space8.jpg");

        fileList.add(space8File1);


        for (File file : fileList) {
            fileRepository.save(file);
        }
    }
}
