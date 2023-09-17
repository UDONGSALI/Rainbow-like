package RainbowLike.controller;

import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduRepository;
import RainbowLike.service.EduService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/edus")
public class EduController {

    private final EduService eduService;

    private final EduRepository eduRepository;

    @GetMapping
    private Iterable<Edu> getEdus() {
        return eduRepository.findAll();
    }

    @PostMapping
    private Edu saveEdu(@RequestBody Edu edu){
        return eduRepository.save(edu);
    }

    private void createEdus() {
    }

    @PostConstruct
    private void createDefaultEdus() {
        ArrayList<EduDto> eduDtoList = EduDto.createDefaultEdu();
        eduService.createDefaultEdus(eduDtoList);
    }
}
