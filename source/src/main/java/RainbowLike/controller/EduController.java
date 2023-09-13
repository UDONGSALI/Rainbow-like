package RainbowLike.controller;

import RainbowLike.dto.EduDto;
import RainbowLike.repository.EduRepository;
import RainbowLike.service.EduService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class EduController {

    private final EduService eduService;

    private final EduRepository eduRepository;

    @PostConstruct
    private void createEdus() {
        ArrayList<EduDto> eduDtoList = EduDto.createEdu();
        eduService.createEdu(eduDtoList);
    }
}
