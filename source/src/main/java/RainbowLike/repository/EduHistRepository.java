package RainbowLike.repository;

import RainbowLike.constant.Status;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EduHistRepository extends JpaRepository <EduHist, Long> {

    List<EduHist> findByMember(Member member);

    @Query("SELECT COUNT(e) FROM EduHist e WHERE e.edu.eduNum = :eduNum AND (e.status = :status1 OR e.status = :status2)")
    Long countByEduAndStatus(Long eduNum, Status status1, Status status2);
}