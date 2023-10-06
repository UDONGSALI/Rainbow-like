package RainbowLike.controller;

import RainbowLike.dto.CBotDto;
import RainbowLike.repository.CbotResRepository;
import RainbowLike.service.CbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor

public class CbotController {

    @Autowired
    CbotResRepository cbotRepository;

    @Autowired
    CbotService cbotService;

    public void createQnA () {
        ArrayList<CBotDto> qnaList = CBotDto.createCBotQnA();
        cbotService.createQna(qnaList);
    }
}
