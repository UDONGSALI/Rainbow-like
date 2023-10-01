package RainbowLike.controller;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import RainbowLike.constant.Status;
import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.entity.EduHist;
import RainbowLike.repository.EduRepository;
import RainbowLike.service.EduService;
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

    private final EduService eduService;

    @GetMapping
    private Iterable<Edu> getEdus() {
        return eduService.findAll();
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<Edu> searchEduHist(@PathVariable String option, @PathVariable String value) {
        return eduService.searchByOptionAndValue(option, value);
    }

    @PostMapping
    public ResponseEntity<Edu> saveEdu(@RequestBody Edu edu) {
        Edu savedEdu = eduService.saveEdu(edu);
        return ResponseEntity.ok(savedEdu);
    }
}
