package RainbowLike.repository;

import RainbowLike.entity.PayHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayHistRepository extends JpaRepository <PayHist, Long>{
}
