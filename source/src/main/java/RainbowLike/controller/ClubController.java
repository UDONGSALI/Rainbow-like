package RainbowLike.controller;

import RainbowLike.entity.Post;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController

public class ClubController {
  @Autowired
   PostRepository postRepository;
    @Autowired
    ClubRepository clubRepository;
//    @Autowired
//    ClubService clubService;


//    @GetMapping("/clubs")
//    public Iterable<Post> getClubs() {
//        Board board = new Board();
//        board.setBoardNum(10L);
//        return postRepository.findByBoard(board);
//    }

    @GetMapping("/clubs/{postId}") // /clubs/post/{postId} 엔드포인트를 정의
    public Optional<Post> getPostById(@PathVariable Long postId) {
        return clubRepository.findById(postId);
    }



//    @PostMapping("/clubs/new")
//    public Iterable<Post> addClubsPost(@RequestParam Post post) {
//        private void Postclub(ClubFormDto clubFormDto) {
//            clubService.saveMember(clubFormDto);
//        }
//    }


}
