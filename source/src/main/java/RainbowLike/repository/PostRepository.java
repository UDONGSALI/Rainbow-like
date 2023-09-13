package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository <Post, Long> {
    Iterable<Post> findByBoard(Board board);

    @Modifying
    @Query("update Post p set p.pageView = p.pageView + 1 where p.id = :id")
    int updateView(Long id);

}