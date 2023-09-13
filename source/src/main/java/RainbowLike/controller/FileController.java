package RainbowLike.controller;

import RainbowLike.entity.*;
import RainbowLike.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final EduRepository eduRepository;
    private final PostRepository postRepository;

    // application.properties 디렉토리 경로를 가져오기 위한 변수
    @Value("${multipart.file.dir}")
    private String dir;

    private final FileRepository fileRepository;

    @GetMapping
    private Iterable<File> getMembers() {
        return  fileRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> uploadFiles(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName) {

        Member member = null;
        Space space = null;
        Edu edu = null;
        Post post = null;

        // 여러 파일을 처리하는 코드
        for (MultipartFile file : files) {
            try {

                // UUID 생성
                UUID uuid = UUID.randomUUID();

                // 파일 저장 경로 설정
                String originalFileName = file.getOriginalFilename();
                String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                String newFileName = uuid.toString() + fileExtension;
                Path filePath = Path.of(dir, newFileName);

                // 폴더가 없으면 폴더를 생성
                if (!Files.exists(filePath.getParent())) {
                    try {
                        Files.createDirectories(filePath.getParent());
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ResponseEntity.status(500).body("폴더 생성 실패");
                    }
                }

                // 파일을 지정된 경로로 복사
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // 업로드된 파일 정보를 데이터베이스에 저장
                File createfile = new File();
                createfile.setFileOriName(file.getOriginalFilename());
                createfile.setFileName(newFileName);
                createfile.setFileUri(filePath.toString());

                // tableName에 따라 적절한 엔티티 검색
                if (tableName.equals("member")) {
                    member = memberRepository.findTopByOrderByMemNumDesc();
                }
                if (tableName.equals("space")) {
                    space = spaceRepository.findTopByOrderBySpaceNumDesc();
                }
                if (tableName.equals("edu")) {
                    edu = eduRepository.findTopByOrderByEduNumDesc();
                }
                if (tableName.equals("post")) {
                    post = postRepository.findTopByOrderByPostNumDesc();
                }

                // 파일과 관련된 엔티티 설정 및 저장
                createfile.setMember(member);
                createfile.setSpace(space);
                createfile.setEdu(edu);
                createfile.setPost(post);

                fileRepository.save(createfile);

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("파일 업로드 실패");
            }
        }
        return ResponseEntity.ok("파일 업로드 성공");
    }
}
