package RainbowLike.repository;

import RainbowLike.entity.FemaleTalentMatching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FemaleTalentMatchingRepository extends JpaRepository<FemaleTalentMatching, Long>{
}
