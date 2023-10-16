package RainbowLike.repository;

import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository <Comment, Long> {

    Comment findByCommNum(Long commNum);

    Comment findTopByOrderByCommNumDesc();
    void deleteByMember(Member member);
    Iterable<Comment> findByPost(Post postNum);
     Iterable<Comment> findByMember(Member MemberNum);


}


