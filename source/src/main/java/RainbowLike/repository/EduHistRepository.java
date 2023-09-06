package RainbowLike.repository;

import RainbowLike.entity.EduHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EduHistRepository extends JpaRepository <EduHist, Long> {
}
