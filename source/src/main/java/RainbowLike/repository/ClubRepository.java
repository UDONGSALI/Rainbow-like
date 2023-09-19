package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClubRepository extends CrudRepository<Post, Long>
{
    List<Post> findByBoard(Board board);

//    Iterable<Post> findById(Long id);
//    @Query("select p from post as p where p.board_num = 10")
//    Iterable<Post> findByClubs();

}
