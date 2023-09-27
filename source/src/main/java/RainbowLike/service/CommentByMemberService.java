package RainbowLike.service;

import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.repository.CommentRepository;
import RainbowLike.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

;

@Service
public class CommentByMemberService {
    private final CommentRepository commentRepository;

    private final MemberRepository memberRepository;


    @Autowired

    public CommentByMemberService(CommentRepository commentRepository, MemberRepository memberRepository) {
        this.commentRepository = commentRepository;
        this.memberRepository =memberRepository;
    }

    public Comment getCommentByMember(Long member){
        // Member 엔티티를 memNum을 사용하여 조회
        Member member = memberRepository.findByMemNum(memNum);
        if (member != null) {
            // 해당 회원의 댓글을 조회
            return commentRepository.findByMember(member);
        } else {
            // 회원이 없는 경우 null을 반환하거나 예외 처리를 수행할 수 있습니다.
            return null;
        }
    }
    }
    // CommentNum을 사용하여 댓글 조회
    public Comment getCommentByCommentNum(Long commNum) {
        return commentRepository.findByCommNum(commNum);
    }
}
