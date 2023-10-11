package RainbowLike.repository;

import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FtWorkerRepository extends JpaRepository<FtWorker, Long> {
    List<FtWorker> findByMember(Member member);

}
