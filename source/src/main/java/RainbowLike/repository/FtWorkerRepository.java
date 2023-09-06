package RainbowLike.repository;

import RainbowLike.entity.FtWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FtWorkerRepository extends JpaRepository <FtWorker, Long> {
}
