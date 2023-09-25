package RainbowLike.controller;


import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.repository.CommentRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.CommentByMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;



@RestController
public class CommentByMemberController {

    private final CommentByMemberService commentByMemberService;
    private final CommentRepository commentRepository;
    private MemberRepository memberRepository;


    @Autowired
    public CommentByMemberController(CommentByMemberService commentByMemberService, CommentRepository commentRepository, MemberRepository memberRepository) {
        this.commentByMemberService = commentByMemberService;
        this.commentRepository=commentRepository;
        this.memberRepository=memberRepository;

    }



    @GetMapping("/comments/member/{memNum}")
    public ResponseEntity<List<Comment>> getCommentByMember(@PathVariable Long memNum) {
        Optional<Member> memberOptional = memberRepository.findById(memNum);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            Iterable<Comment> comments = commentByMemberService.getCommentByMember(member);
            return ResponseEntity.ok((List<Comment>) comments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}