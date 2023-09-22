package RainbowLike.repository;

import RainbowLike.entity.Board;
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

//    List<Post> findByIdAndContent(Long id, String content);


<<<<<<< HEAD
=======
    @Modifying
    @Query("update Post p set p.pageView = p.pageView + 1 where p.id = :id")
    int updateView(Long id);
>>>>>>> 4d87f0450afc0eb84e43614b0424576e0a14d7b3
}
