package RainbowLike.controller;
import RainbowLike.dto.SpaceDto;
import RainbowLike.entity.Space;
import RainbowLike.repository.SpaceRepository;
import RainbowLike.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class SpaceController {


    private final SpaceService spaceService;
    private final SpaceRepository spaceRepository;

    @RequestMapping("/spaces")
    private Iterable<Space> getSpaces(){return spaceRepository.findAll();}

    @PostConstruct
    private void createSpaces(){
        ArrayList<SpaceDto> spaceDtoList = SpaceDto.createSpaces();
        spaceService.createSpaces(spaceDtoList);
    }
}
