package RainbowLike.controller;

import RainbowLike.dto.CommentFormDto;
import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.CommentRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class CommentController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CommentService commentService;

    @RequestMapping("/comments")
    public Iterable<Comment> getComments() {
        // comment 정보 전체 찾기
        return commentRepository.findAll();
    }


    @RequestMapping("/postnumcomm/{id}")
    public Iterable<Comment> getPostNumComm(@PathVariable Long id) {
        //게시글 넘버 조회
        Post post = postRepository.findByPostNum(id);

        return commentRepository.findByPost(post);
    }


    @RequestMapping("/membernumcomm/{id}")
    public Iterable<Comment> getMemberNumComm(@PathVariable Long id) {
        //멤버 넘버 조회
        Member member = memberRepository.findByMemNum(id);

        return commentRepository.findByMember(member);
    }




@PostMapping("/comments/new")
    public ResponseEntity<Comment> createComment(@RequestBody CommentFormDto commentFormDto) {
        Comment newComm = new Comment();

        Post post = new Post();
        post.setPostNum(commentFormDto.getPostNum());
        newComm.setPost(post);
        Member member = new Member();
        member.setMemNum(commentFormDto.getMemNum());
        newComm.setMember(member);

        newComm.setContent(commentFormDto.getContent());
        newComm.setParentNum(commentFormDto.getParentNum());
        newComm.setDelYN(commentFormDto.getDelYN());

        Comment savedComment = commentRepository.save(newComm);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedComment);
    }

    public void createComms(){
        ArrayList<CommentFormDto> commentDtoList = CommentFormDto.createTestComments();
        commentService.createcomments(commentDtoList);
    }



}
