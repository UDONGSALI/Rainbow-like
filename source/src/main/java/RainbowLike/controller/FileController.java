package RainbowLike.controller;

import RainbowLike.entity.File;
import RainbowLike.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;

    @GetMapping
    public ResponseEntity<Iterable<File>> getFiles() {
        return ResponseEntity.ok(fileService.findAllFiles());
    }

    @GetMapping("/{table}/{num}")
    public ResponseEntity<Iterable<File>> getFilesByTypeAndId(@PathVariable String table, @PathVariable Long num) {
        return ResponseEntity.ok(fileService.findFilesByTypeAndId(table, num));
    }

    @GetMapping("/table/{name}")
    public ResponseEntity<Iterable<File>> getFindByTableName(@PathVariable String name) {
        return ResponseEntity.ok(fileService.findByTableName(name));
    }

    @DeleteMapping("/eduNum/{eduNum}")
    public ResponseEntity<Void> deleteFilesByEduNum(@PathVariable Long eduNum) {
        fileService.deleteFilesByEduNum(eduNum);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<String> uploadFiles(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName, @RequestParam("number") Long number) {
        System.out.println(tableName);
        System.out.println(number);
        System.out.println("파일 확인");
        try {
            String result = fileService.uploadFiles(files, tableName, number);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/FileNums")
    public ResponseEntity<List<Long>> uploadAndGetFileNums(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName, @RequestParam("number") Long number) {
        try {
            List<Long> fileNums = fileService.uploadFilesAndGetFileNums(files, tableName, number);
            return ResponseEntity.ok(fileNums);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/qill")
    public ResponseEntity<List<String>> uploadQillFiles(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName, @RequestParam("number") Long number) {
        try {
            List<String> fileUrls = fileService.uploadFilesForQuill(files, tableName, number);
            // 이미지 업로드 후, 이미지의 postNum을 업데이트
            for (String imageUrl : fileUrls) {
                fileService.updatePostNumForImage(imageUrl, number);
            }
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    @Transactional
    @PatchMapping("/edit")
    public ResponseEntity<String> editFiles(@RequestBody List<Long> fileNumbersWithPostNum) {
        if (fileNumbersWithPostNum.isEmpty()) {
            return ResponseEntity.badRequest().body("File numbers list is empty");
        }

        Long postNum = fileNumbersWithPostNum.get(fileNumbersWithPostNum.size() - 1); // 마지막 번호를 postNum으로 가져옵니다.
        List<Long> fileNumsExcludingPostNum = fileNumbersWithPostNum.subList(0, fileNumbersWithPostNum.size() - 1); // 나머지는 파일 번호로 취급합니다.

        try {
            fileService.updatePostNumForFiles(fileNumsExcludingPostNum, postNum);
            return ResponseEntity.ok("Files updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }


}
