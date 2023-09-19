package RainbowLike.repository;

import RainbowLike.entity.FtConsumer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FtConsumerRepository extends JpaRepository <FtConsumer,Long> {
}
