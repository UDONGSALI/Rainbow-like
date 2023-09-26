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

    public Iterable<Comment> getCommentByMember(Member member){
        return commentRepository.findByMember(member);
    }


}
