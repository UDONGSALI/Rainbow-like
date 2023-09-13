package RainbowLike.controller;

import RainbowLike.dto.SpaceDto;
import RainbowLike.entity.Space;
import RainbowLike.repository.SpaceRepository;
import RainbowLike.service.SpaceService;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
=======
>>>>>>> 3db001eb08878d49e7a560a9a7c6a636782027da
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
