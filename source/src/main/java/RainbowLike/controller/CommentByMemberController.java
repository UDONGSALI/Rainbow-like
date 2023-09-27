package RainbowLike.controller;


import RainbowLike.component.CommentNotFoundException;
import RainbowLike.component.MemberNotFoundException;
import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.repository.CommentRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.CommentByMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;





@RestController
public class CommentByMemberController {
    @Autowired
    private CommentByMemberService commentByMemberService;
    @Autowired
    private CommentRepository commentRepository;
    private MemberRepository memberRepository;

    @GetMapping("/comments/member/{commNum}") // URL 경로의 {CommentNum}을 수정
    public Iterable<Comment> getCommentsByMember(@PathVariable Long memNum) { // 파라미터명을 CommentNum으로 수정
        Comment comment = commentByMemberService.getCommentByCommentNum(memNum); // CommentNum을 사용하여 댓글 조회
        if (comment != null) {
            // 댓글을 작성한 회원(Member)을 가져오는 로직을 작성
            Member member = commentByMemberService.getMemberByMemNum(memNum); // memNum을 사용하여 회원 조회
            if (member != null) {
                return commentRepository.findByMember(member);
            } else {
                throw new MemberNotFoundException("Member not found with memNum: " + memNum);
            }
        }
//            Member member = comment.getMember();
//            if (member != null) {
//                return commentRepository.findByMember(member);
//            } else {
//                throw new MemberNotFoundException("Member not found for CommentNum: " + CommNum);
//            }
//        } else {
//            throw new CommentNotFoundException("Comment not found with CommentNum: " + CommNum);
//        }
//    }
    // MemberNotFoundException을 처리하는 핸들러 추가
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<String> handleMemberNotFoundException(MemberNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // CommentNotFoundException을 처리하는 핸들러 추가
    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<String> handleCommentNotFoundException(CommentNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}

