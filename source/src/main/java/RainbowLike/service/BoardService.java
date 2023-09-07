package RainbowLike.service;

import RainbowLike.dto.BoardDto;
import RainbowLike.entity.Board;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final ModelMapper mapper;

    private final BoardRepository boardRepository;
    private final PostRepository postRepository;
    private final ClubRepository clubRepository;

    public void createBoards(ArrayList<BoardDto> boardDtoList) {

        for (BoardDto boardDto : boardDtoList) {

            Board board = mapper.map(boardDto, Board.class);

            boardRepository.save(board);
        }
    }



}

