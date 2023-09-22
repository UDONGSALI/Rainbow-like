package RainbowLike.controller;

import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/edus")
public class EduController {

    private final EduRepository eduRepository;

    private final ModelMapper mapper;

    @GetMapping
    private Iterable<Edu> getEdus() {
        return eduRepository.findAll();
    }

    @PostMapping
    private ResponseEntity<Edu> saveEdu(@RequestBody Edu edu) {
        return ResponseEntity.ok((eduRepository.save(edu)));
    }

    @PostConstruct
    private void createDefaultEdus() {
        ArrayList<EduDto> eduDtos = EduDto.createDefaultEdu();
        for (EduDto eduDto: eduDtos) {
            Edu edu = mapper.map(eduDto, Edu.class);
            saveEdu(edu);
        }
    }
}
