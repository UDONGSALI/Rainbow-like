package RainbowLike.repository;

import RainbowLike.entity.RentHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentHistRepository extends JpaRepository <RentHist,Long> {

}
