package RainbowLike.controller;

import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduRepository;
import RainbowLike.service.EduService;
import RainbowLike.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/edus")
public class EduController {

    private final EduService eduService;

    private final EduRepository eduRepository;

    private final FileService fileService;

    private final FileController fileController;

    @GetMapping
    private Iterable<Edu> getEdus() {
        return eduRepository.findAll();
    }

    @PostMapping
    private ResponseEntity<Edu> saveEdu(@RequestBody Edu edu) {
        return ResponseEntity.ok(eduRepository.save(edu));
    }

    @PostConstruct
    private void createDefaultEdus() {
        ArrayList<EduDto> eduDtoList = EduDto.createDefaultEdu();
        eduService.createDefaultEdus(eduDtoList);
    }
}
