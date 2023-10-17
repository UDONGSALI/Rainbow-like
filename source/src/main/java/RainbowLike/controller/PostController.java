package RainbowLike.controller;

import RainbowLike.constant.Status;
import RainbowLike.dto.PostFormDto;
import RainbowLike.dto.PostInfo;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.PostService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {


    private final PostRepository postRepository;
    private final BoardRepository boardRepository;
    private final PostService postService;
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);
    private final MemberRepository memberRepository;

    @GetMapping
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostInfo> getPostInfo(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        Board board = post.getBoard();
        Member member = post.getMember();
        PostInfo postInfo = new PostInfo(post, board, member);
        return ResponseEntity.ok(postInfo);
    }

    // 게시판 넘버로 게시물을 검색
    @GetMapping("/board/{boardNum}")
    public Iterable<Post> getPostsByBoardNum(@PathVariable Long boardNum) {
        return postRepository.findByBoard(boardRepository.findByBoardNum(boardNum));
    }

    @GetMapping("/search/{option}/{value}")
    public ResponseEntity<Iterable<Post>> searchPost(@PathVariable String option, @PathVariable String value) {
        Iterable<Post> postInfo = postService.searchPostsByOptionAndValue(option, value);
        return ResponseEntity.ok(postInfo);
    }

    @GetMapping("/{boardNum}/search/{option}/{value}")
    public ResponseEntity<Iterable<Post>> searchBoardPost(@PathVariable Long boardNum, @PathVariable String option, @PathVariable String value) {
        Iterable<Post> postInfo = postService.searchPostsByBoardNumAndOptionAndValue(boardNum, option, value);
        return ResponseEntity.ok(postInfo);
    }

    @GetMapping("/lastPostNum")
    public ResponseEntity<Long> getLastPostNum() {
        Post lastPost = postRepository.findTopByOrderByPostNumDesc();
        logger.info("Last Post: " + lastPost);
        if (lastPost != null) {
            return ResponseEntity.ok().body(lastPost.getPostNum());
        }
        return ResponseEntity.ok().body(0L);  // 0을 반환하거나 다른 기본값을 반환할 수 있습니다.
    }


    // 회원 번호로 멤버별 클럽의 게시글 요청
    @RequestMapping("/memberClub/{memNum}")
    public Iterable<Post> getClubPostsByMember(@PathVariable Long memNum) {

        Board clubNumBoard = boardRepository.findByBoardNum(9L);
        return postRepository.findByBoardAndMemberMemNum(clubNumBoard, memNum);
    }
    
    // 회원 번호로 멤버별 상담(온라인상담,노무상담게시판)의 게시글 요청
    @RequestMapping("/memberCounsel/{memNum}")
    public Iterable<Post> getCounselByMember(@PathVariable Long memNum) {

        List<Board> councelBoard = boardRepository.findByBoardNameContaining("상담");
        return postRepository.findByBoardInAndMemberMemNum(councelBoard, memNum);
    }

    // boardNum으로 대관이용후기 게시글 요청
    @RequestMapping("/rentReview")
    public Iterable<Post> getRentReviewPosts() {
        Board rentReviewNumBoard = boardRepository.findByBoardNum(6L);
        return postRepository.findByBoard(rentReviewNumBoard);
    }
    // 게시글 번호와 게시판 번호로 게시글 찾기
    @GetMapping("/rentReview/{postNum}")
    public ResponseEntity<Post> getPostByPostNumAndBoardNum(
            @PathVariable Long postNum) {
        Post post = postRepository.findByPostNumAndBoard_BoardNum(postNum, 6L); // 6L은 고정된 값
        return ResponseEntity.ok(post);
    }

@PostMapping("/posts/new")
    public ResponseEntity<Post> createPost(@RequestBody PostFormDto postFormDto) {
        Post newPost = new Post();
        newPost.setTitle(postFormDto.getTitle());
        newPost.setContent(postFormDto.getContent());
        newPost.setPageView(postFormDto.getPageView());
        newPost.setConselStatus(postFormDto.getConselStatus());
        newPost.setParentsNum(postFormDto.getParentsNum());
        newPost.setClubAllowStatus(postFormDto.getClubAllowStatus());
        newPost.setClubRecuStatus(postFormDto.getClubRecuStatus());
        newPost.setDelYN(postFormDto.getDelYN());

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

    @RequestMapping("/posts/edit/{postId}")
    public ResponseEntity<Post> editPost(@PathVariable Long postId, @RequestBody PostFormDto postFormDto) {
        Post editPost = new Post();
        editPost.setPostNum(postId);
        editPost.setTitle(postFormDto.getTitle());
        editPost.setContent(postFormDto.getContent());
        editPost.setPageView(postFormDto.getPageView());
        editPost.setConselStatus(postFormDto.getConselStatus());
        editPost.setParentsNum(postFormDto.getParentsNum());
        editPost.setClubAllowStatus(postFormDto.getClubAllowStatus());
        editPost.setClubRecuStatus(postFormDto.getClubRecuStatus());
        editPost.setDelYN(postFormDto.getDelYN());

        Board board = new Board();
        board.setBoardNum(postFormDto.getBoardNum());
        editPost.setBoard(board);
        Member member = new Member();
        member.setMemNum(postFormDto.getMemNum());
        editPost.setMember(member);
        Post savedPost = postRepository.save(editPost);
        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedPost);
    }

    @PostMapping("/{id}/increase-view")
    public ResponseEntity<Void> increasePageView(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        // 조회수를 1 증가시킵니다.
        post.setPageView(post.getPageView() + 1);
        postRepository.save(post);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update/{postNum}")
    public ResponseEntity<?> updatePost(@PathVariable Long postNum, @RequestBody Map<String, String> body) {
        String action = body.get("action");

        try {
            Optional<Post> updatedPost;
            switch (action) {
                case "status":
                    Status status = Status.valueOf(body.get("status").toUpperCase());
                    updatedPost = postService.updateStatus(postNum, status);
                    break;
                case "labor":
                    String memId = body.get("laborId");
                    updatedPost = postService.updateLabor(postNum, memId);
                    break;
                case "cancelLabor":
                    updatedPost = Optional.ofNullable(postService.cancelLabor(postNum));
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid action");
            }
            if (updatedPost.isPresent()) {
                return ResponseEntity.ok(updatedPost.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input value");
        }
    }

    @DeleteMapping("/{postNum}")
    public ResponseEntity<?> deletePost(@PathVariable Long postNum) {
        try {
            postService.deletePost(postNum);
            return ResponseEntity.ok("Post and related posts deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred while deleting post and related posts: " + e.getMessage());
        }
    }

    @PutMapping("/posts/update/{postNum}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postNum, @RequestBody PostFormDto postFormDto) {
        Optional<Post> existingPost = postRepository.findById(postNum);
        Board board = existingPost.get().getBoard();

        if (!existingPost.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Post postToUpdate = existingPost.get();
        postToUpdate.setTitle(postFormDto.getTitle());
        postToUpdate.setContent(postFormDto.getContent());
        postToUpdate.setPageView(postFormDto.getPageView());
        postToUpdate.setConselStatus(postFormDto.getConselStatus());
        postToUpdate.setParentsNum(postFormDto.getParentsNum());
        postToUpdate.setClubAllowStatus(postFormDto.getClubAllowStatus());
        postToUpdate.setClubRecuStatus(postFormDto.getClubRecuStatus());
        postToUpdate.setDelYN(postFormDto.getDelYN());

        postToUpdate.setBoard(board);

        Member member = new Member();
        member.setMemNum(postFormDto.getMemNum());
        postToUpdate.setMember(member);

        Post updatedPost = postRepository.save(postToUpdate);

        return ResponseEntity.ok(updatedPost);
    }
}
