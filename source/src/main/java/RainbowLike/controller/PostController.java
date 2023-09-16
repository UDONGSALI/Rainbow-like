package RainbowLike.controller;

import RainbowLike.dto.PostFormDto;
import RainbowLike.dto.PostInfo;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private PostService postService;

    @RequestMapping("/posts")
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    // 게시판 아이디로 게시물을 검색
    @RequestMapping("/posts/{boardNum}")
    public Iterable<Post> getPostById(@PathVariable Long boardNum) {
        return postRepository.findByBoard(boardRepository.findByBoardNum(boardNum));
    }

    @RequestMapping("/clubs")
    public Iterable<Post> getClubPosts() {
        //게시판 이름으로 게시글 요청
        Board clubBoard = boardRepository.findByBoardName("club");
        return postRepository.findByBoard(clubBoard);
    }

    @RequestMapping("/clubnum")
    public Iterable<Post> getClulbPostNum() {
        //게시판 번호로 게시글 요청
        Board clubNumBoard = boardRepository.findByBoardNum(10L);
        return postRepository.findByBoard(clubNumBoard);
    }


    @GetMapping("/posts/{id}")
    public ResponseEntity<PostInfo> getPostInfo(@PathVariable Long id) {

//         포스트 id를 요청하면 해당 id에 대한 post, board, member 정보를 하나의 배열로 반환받을 수 있습니다.
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        Board board = post.getBoard();
        Member member = post.getMember();

        PostInfo postInfo = new PostInfo(post, board, member);

        return ResponseEntity.ok(postInfo);
    }




@PostMapping("/posts/new")
    public ResponseEntity<Post> createPost(@RequestBody PostFormDto postFormDto) {
        Post newPost = new Post();
        newPost.setTitle(postFormDto.getTitle());
        newPost.setContent(postFormDto.getContent());
        newPost.setPageView(postFormDto.getPageView());
        newPost.setConsField(postFormDto.getConsField());
        newPost.setParentsNum(postFormDto.getParentsNum());
        newPost.setClubAllowStatus(postFormDto.getClubAllowStatus());
        newPost.setClubRecuStatus(postFormDto.getClubRecuStatus());

        Board board = new Board();
        board.setBoardNum(postFormDto.getBoardNum());
        newPost.setBoard(board);
        Member member = new Member();
        member.setMemNum(postFormDto.getMemNum());
        newPost.setMember(member);

        Post savedPost = postRepository.save(newPost);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedPost);
    }

    @PostMapping("posts/{id}/increase-view")
    public ResponseEntity<Void> increasePageView(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        // 조회수를 1 증가시킵니다.
        post.setPageView(post.getPageView() + 1);
        postRepository.save(post);

        return ResponseEntity.ok().build();
    }

    public void createPosts(){
        ArrayList<PostFormDto> postDtoList = PostFormDto.createTestPost();
        postService.createPosts(postDtoList);
    }

}
