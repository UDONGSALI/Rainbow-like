package RainbowLike.repository;

<<<<<<< HEAD
=======
import RainbowLike.entity.Edu;
>>>>>>> 3db001eb08878d49e7a560a9a7c6a636782027da
import RainbowLike.entity.Member;
import RainbowLike.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends JpaRepository<Space,Long> {

<<<<<<< HEAD

    Space findBySpaceName(String spaceName);
=======
    Space findBySpaceNum(Long sapceNum);

    Space findTopByOrderBySpaceNumDesc();



>>>>>>> 3db001eb08878d49e7a560a9a7c6a636782027da
}
