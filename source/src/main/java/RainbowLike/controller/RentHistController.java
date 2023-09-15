package RainbowLike.controller;


import RainbowLike.dto.RentHistDto;
import RainbowLike.entity.RentHist;
import RainbowLike.service.RentHistService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/rent")

public class RentHistController {

    private final RentHistService rentHistService;




    @GetMapping
    public List<RentHist> getAllRentHist() {
        return rentHistService.getAllRentHists();
    }



    public void createBasicRent() {
        ArrayList<RentHistDto> rentHistDtoList =RentHistDto.createRentHists();
        rentHistService.createRentHists(rentHistDtoList);

    }

}
