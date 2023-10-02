package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository <Post,Long> {

    Post findByPostNum(Long postNum);

    Post findTopByOrderByPostNumDesc();

    Iterable<Post> findByBoard(Board clubBoard);
    Iterable<Post> findByBoardAndTitleContaining(Board board, String title);
    Iterable<Post> findByBoardAndContentContaining(Board board, String content);
    Iterable<Post> findByBoardAndMemberIn(Board board, List<Member> members);

//    List<Post> findByIdAndContent(Long id, String content);


    @Modifying
    @Query("update Post p set p.pageView = p.pageView + 1 where p.postNum = :id")
    int updateView(Long id);


    List<Post> findByMember(Member member);
}
