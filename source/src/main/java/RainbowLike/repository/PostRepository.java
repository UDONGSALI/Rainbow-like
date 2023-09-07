package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository <Post,Long> {
    Iterable<Post> findByBoard(Board board);


}
