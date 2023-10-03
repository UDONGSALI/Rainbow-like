package RainbowLike.controller;

import RainbowLike.entity.File;
import RainbowLike.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        try {
            String result = fileService.uploadFiles(files, tableName, number);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
