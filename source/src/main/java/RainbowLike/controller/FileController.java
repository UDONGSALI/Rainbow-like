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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final EduRepository eduRepository;
    private final PostRepository postRepository;
    private final FileRepository fileRepository;

    // application.properties 디렉토리 경로를 가져오기 위한 변수
    @Value("${multipart.file.dir}")
    private String dir;


    @Value("${spring.cloud.gcp.storage.bucket}") // application.yml에 써둔 bucket 이름
    private String bucketName;

    @GetMapping
    private Iterable<File> getMembers() {
        return fileRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> uploadFiles(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName) {

        Member member = null;
        Space space = null;
        Edu edu = null;
        Post post = null;

        String midPath = "";

        // tableName에 따라 적절한 엔티티 검색
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
            case "post":
                post = postRepository.findTopByOrderByPostNumDesc();
                midPath = tableName + "/" + post.getPostNum() + "/";
                break;
            default:
                // 여기에는 tableName 값이 예상 범위 외일 경우의 처리 로직을 추가하실 수 있습니다.
                break;
        }


//        // 컴퓨터에 저장하는 메소드
//        for (MultipartFile file : files) {
//            try {
//
//                // UUID 생성
//                UUID uuid = UUID.randomUUID();
//
//                // 파일 저장 경로 설정
//                String originalFileName = file.getOriginalFilename();
//                String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
//                String newFileName = uuid.toString() + fileExtension;
//                Path filePath = Path.of(dir, newFileName);
//
//
//                // 폴더가 없으면 폴더를 생성
//                if (!Files.exists(filePath.getParent())) {
//                    try {
//                        Files.createDirectories(filePath.getParent());
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                        return ResponseEntity.status(500).body("폴더 생성 실패");
//                    }
//                }
//
//                // 파일을 지정된 경로로 복사
//                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//                // 업로드된 파일 정보를 데이터베이스에 저장
//                File createfile = new File();
//                createfile.setFileOriName(file.getOriginalFilename());
//                createfile.setFileName(newFileName);
//                createfile.setFileUri(filePath.toString());
//
//                // tableName에 따라 적절한 엔티티 검색
//                if (tableName.equals("member")) {
//                    member = memberRepository.findTopByOrderByMemNumDesc();
//                }
//                if (tableName.equals("space")) {
//                    space = spaceRepository.findTopByOrderBySpaceNumDesc();
//                }
//                if (tableName.equals("edu")) {
//                    edu = eduRepository.findTopByOrderByEduNumDesc();
//                }
//                if (tableName.equals("post")) {
//                    post = postRepository.findTopByOrderByPostNumDesc();
//                }
//
//                // 파일과 관련된 엔티티 설정 및 저장
//                createfile.setMember(member);
//                createfile.setSpace(space);
//                createfile.setEdu(edu);
//                createfile.setPost(post);
//
//                fileRepository.save(createfile);
//
//            } catch (IOException e) {
//                e.printStackTrace();
//                return ResponseEntity.status(500).body("파일 업로드 실패");
//            }
//        }
//        return ResponseEntity.ok("파일 업로드 성공");

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
//                // UUID를 생성하여 파일 이름을 고유하게 만듭니다.
//                String uuid = UUID.randomUUID().toString();
//                // 파일 확장자 가져오기
//                String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));


                // 파일 이름 변경
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

                fileRepository.save(createfile);
            }


            return ResponseEntity.ok("파일 업로드 성공");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 업로드 실패");
        }
    }
}
