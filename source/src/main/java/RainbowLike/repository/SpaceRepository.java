package RainbowLike.repository;

import RainbowLike.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {


    Space findBySpaceName(String spaceName);

    Space findBySpaceNum(Long sapceNum);

    Space findTopByOrderBySpaceNumDesc();


}
