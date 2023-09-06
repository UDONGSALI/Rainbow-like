package RainbowLike.controller;


import RainbowLike.dto.BoardDto;
import RainbowLike.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostConstruct
    private void createBoards() {

        ArrayList<BoardDto> boardDtoList = BoardDto.createBoards();

        boardService.createBoards(boardDtoList);
    }
}
