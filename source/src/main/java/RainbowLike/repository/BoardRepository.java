package RainbowLike.repository;

import RainbowLike.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository <Board, Long> {
    Board findByBoardName(String boardName);

    Board findByBoardNum(Long boardNum);
}
