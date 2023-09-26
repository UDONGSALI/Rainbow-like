package RainbowLike.controller;

import RainbowLike.entity.*;
import RainbowLike.repository.*;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final EduRepository eduRepository;
    private final EduHistRepository eduHistRepository;
    private final PostRepository postRepository;
    private final FileRepository fileRepository;
    private final RestTemplate restTemplate;

    // application.properties 디렉토리 경로를 가져오기 위한 변수
    @Value("${multipart.file.dir}")
    private String dir;

    @Value("${spring.cloud.gcp.storage.bucket}") // application.yml에 써둔 bucket 이름
    private String bucketName;

    @GetMapping
    private Iterable<File> getFiles() {
        return fileRepository.findAll();
    }

    @GetMapping("/eduNum/{eduNum}")
    private Iterable<File> getFilesByEduNum(@PathVariable Long eduNum) {
        return fileRepository.findByEdu(eduRepository.findByEduNum(eduNum));
    }
    @GetMapping("/postNum/{postNum}")
    private Iterable<File> getFilesByPostNum(@PathVariable Long postNum) {
       return fileRepository.findByPost(postRepository.findByPostNum(postNum));
    }
    @GetMapping("/post")
    private Iterable<File> getFindByPostIsNotNull(){
        return fileRepository.findByPostIsNotNull();
    }

    @DeleteMapping("/eduNum/{eduNum}")
    private void deleteFilesByEduNum(@PathVariable Long eduNum) {
        Iterable<File> files = getFilesByEduNum(eduNum);
        for (File file : files) {
            System.out.println(file.getFileNum());
            String deleteUrl = "http://localhost:8090/api/files/" + file.getFileNum();
            restTemplate.delete(deleteUrl);
        }
    }

    @PostMapping
    public ResponseEntity<String> uploadFiles(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName, @RequestParam("number") Long number) {

        Member member = null;
        Space space = null;
        Edu edu = null;
        EduHist eduHist = null;
        Post post = null;

        String midPath = "";

        // 넘버가 0 일 경우 == 새로운 데이터를 추가하는 경우
        if (number == 0) {
            switch (tableName) {
                case "member":
                    member = memberRepository.findTopByOrderByMemNumDesc();
                    midPath = tableName + "/" + member.getMemNum() + "/";
                    break;
                case "space":
                    space = spaceRepository.findTopByOrderBySpaceNumDesc();
                    midPath = tableName + "/" + space.getSpaceNum() + "/";
                    break;
                case "edu":
                    edu = eduRepository.findTopByOrderByEduNumDesc();
                    midPath = tableName + "/" + edu.getEduNum() + "/";
                    break;
                case "eduHist":
                    eduHist = eduHistRepository.findTopByOrderByEduHistNumDesc();
                    midPath = tableName + "/" + eduHist.getEduHistNum() + "/";
                    break;
                case "post":
                    post = postRepository.findTopByOrderByPostNumDesc();
                    midPath = tableName + "/" + post.getPostNum() + "/";
                    break;
                default:
                    // 여기에는 tableName 값이 예상 범위 외일 경우의 처리 로직을 추가하실 수 있습니다.
                    break;
            }
            // 넘버가 0이 아닌 경우 == 데이터를 수정하는 경우
        } else {
            switch (tableName) {
                case "member":
                    member = memberRepository.findByMemNum(number);
                    if (member != null) {
                        midPath = tableName + "/" + member.getMemNum() + "/";
                    }
                    break;
                case "space":
                    space = spaceRepository.findBySpaceNum(number);
                    if (space != null) {
                        midPath = tableName + "/" + space.getSpaceNum() + "/";
                    }
                    break;
                case "edu":
                    edu = eduRepository.findByEduNum(number);
                    if (edu != null) {
                        midPath = tableName + "/" + edu.getEduNum() + "/";
                    }
                    break;
                case "eduHist":
                    eduHist = eduHistRepository.findByEduHistNum(number);
                    if (eduHist != null) {
                        midPath = tableName + "/" + eduHist.getEduHistNum() + "/";
                    }
                    break;
                case "post":
                    post = postRepository.findByPostNum(number);
                    if (post != null) {
                        midPath = tableName + "/" + post.getPostNum() + "/";
                    }
                    break;
                default:
                    // 여기에는 tableName 값이 예상 범위 외일 경우의 처리 로직을 추가하실 수 있습니다.
                    break;
            }
        }


        try {

            // 구글 클라우드 서비스 설정
            ClassPathResource resource = new ClassPathResource("rainbow-like-6e3171ac1695.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
            String projectId = "rainbow-like";
            Storage storage = StorageOptions.newBuilder()
                    .setProjectId(projectId)
                    .setCredentials(credentials)
                    .build()
                    .getService();


            for (MultipartFile file : files) {

                // 파일 이름에 경로 추가
                String newFileName = midPath + file.getOriginalFilename();
                // 파일 url
                String fileUrl = "https://storage.googleapis.com/" + bucketName + "/" + newFileName;

                // BlobInfo 객체 생성
                BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, newFileName).build();

                // GCS에 파일 업로드
                Blob blob = storage.create(blobInfo, file.getBytes());


                // 업로드된 파일 정보를 데이터베이스에 저장
                File createfile = new File();
                createfile.setFileOriName(file.getOriginalFilename());
                createfile.setFileName(newFileName);
                createfile.setFileUri(fileUrl.toString());

                // 외래키 저장
                createfile.setMember(member);
                createfile.setSpace(space);
                createfile.setEdu(edu);
                createfile.setPost(post);
                createfile.setEduHist(eduHist);

                fileRepository.save(createfile);
            }

            return ResponseEntity.ok("파일 업로드 성공");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 업로드 실패");
        }
    }
}
