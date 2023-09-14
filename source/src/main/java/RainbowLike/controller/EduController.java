package RainbowLike.controller;

import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduRepository;
import RainbowLike.service.EduService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/edu")
public class EduController {

    private final EduService eduService;

    private final EduRepository eduRepository;

    @GetMapping
    private Iterable<Edu> getEdus() {
        return eduRepository.findAll();
    }

    @PostConstruct
    private void createEdus() {
        ArrayList<EduDto> eduDtoList = EduDto.createEdu();
        eduService.createEdu(eduDtoList);
    }
}
