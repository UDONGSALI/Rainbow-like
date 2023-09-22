package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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

>>>>>>> 529962d (js 폴더 안 Footer.css,Footer.module.css 삭제)
}
