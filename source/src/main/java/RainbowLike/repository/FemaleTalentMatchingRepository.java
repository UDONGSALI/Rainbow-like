package RainbowLike.repository;

import RainbowLike.entity.FemaleTalentMatching;
import RainbowLike.entity.FtConsumer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FemaleTalentMatchingRepository extends JpaRepository<FemaleTalentMatching, Long>{
    List<FemaleTalentMatching> findByFtConsumer(FtConsumer ftc);

}
