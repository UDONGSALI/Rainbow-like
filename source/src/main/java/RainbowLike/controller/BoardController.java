package RainbowLike.controller;


import RainbowLike.dto.BoardDto;
import RainbowLike.entity.Board;
import RainbowLike.repository.BoardRepository;
import RainbowLike.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    private final BoardRepository boardRepository;

    @PostConstruct
    private void createBoards() {
        ArrayList<BoardDto> boardDtoList = BoardDto.createBoards();
        boardService.createBoards(boardDtoList);
    }

    @RequestMapping("/boards")
    private Iterable<Board> getBoards() {
        return boardRepository.findAll();
    }
}
