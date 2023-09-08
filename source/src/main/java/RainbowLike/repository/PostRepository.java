package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import RainbowLike.projection.PostProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository <Post,Long> {
    Iterable<Post> findByBoard(Board board);

//    List<PostProjection> findByTitle(String title);



//    @Query("SELECT p.title, p.content, p.edit_date, " +
//            "p.club_allow_status, p.club_recu_status, " +
//            "p.board_num, b.board_name, m.name " +
//            "FROM Post p, Board b, member m WHERE p.board_num = b.board_num " +
//            "AND p.member_num = m.member_num ")
//    PostProjection findPostProjectionByAll();
//
//
//        @Query("SELECT p.title, p.content, p.edit_date, " +
//                "p.club_allow_status, p.club_recu_status, " +
//                "p.board_num, b.board_name, m.name " +
//            "FROM Post p, Board b, member m WHERE p.board = :id " +
//            "AND p.board_num = b.board_num AND p.mem_num = m.mem_num ")
//    PostProjection findPostProjectionByBoardNum(@Param("id") Long id);
//}
//@Query("SELECT p.title, p.content, p.writeDate, " +
//        "p.clubAllowStatus, p.clubRecuStatus, " +
//        "p.board " +
//        "FROM Post p, Board b WHERE p.board = :id " +
//        "AND p.member_num = m.member_num ")
//PostProjection findPostProjectionByAll();




    @Query("SELECT p.title, p.content, p.writeDate, " +
            "p.clubAllowStatus, p.clubRecuStatus, " +
            "p.board " +
            "FROM Post p, Board b WHERE p.board = :id ")
    PostProjection findPostProjectionByBoardNum(@Param("id") Long id);
}