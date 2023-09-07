package RainbowLike.controller;

import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import RainbowLike.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class ClubController {
    private final PostRepository postRepository;

    @Autowired
    public ClubController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/clubs")
    public List<Post> getClubs() {
        Board board = new Board();
        board.setBoardNum(10L);
        return postRepository.findByBoard(board);
    }

}
