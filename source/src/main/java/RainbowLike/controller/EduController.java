package RainbowLike.controller;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import RainbowLike.constant.Status;
import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.entity.EduHist;
import RainbowLike.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

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
    @GetMapping("/{type}/{eduname}")
    private Iterable<Edu> getByEduNameEdus(@PathVariable String type, @PathVariable String eduname) {
        if ("title".equals(type)) {
            return eduRepository.findByEduNameContaining(eduname);
        } else if ("content".equals(type)) {
            return eduRepository.findByContentContaining(eduname);
        } else {
            // 타입이 잘못 지정되거나 지원하지 않는 경우 오류 메시지 반환
            throw new IllegalArgumentException("Unsupported search type: " + type);
        }
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<Edu> searchEduHist(@PathVariable String option, @PathVariable String value) {
        Iterable<Edu> result;
        switch (option) {
            case "eduName":
                result = eduRepository.findByEduNameContaining(value);
                break;
            case "content":
                result = eduRepository.findByContentContaining(value);
                break;
            case "type":
                EduType type = EduType.valueOf(value);
                result = eduRepository.findByType(type);
                break;
            case "recuMethod":
                RecuMethod recuMethod = RecuMethod.valueOf(value);
                result = eduRepository.findByRecuMethod(recuMethod);
                break;
            default:
                result = new ArrayList<>();
        }
        return result;
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
