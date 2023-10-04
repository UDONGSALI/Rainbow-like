package RainbowLike.repository;

import RainbowLike.constant.Status;
import RainbowLike.constant.Type;
import RainbowLike.entity.Member;
import RainbowLike.entity.RentHist;
import RainbowLike.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentHistRepository extends JpaRepository <RentHist,Long> {

    List<RentHist> findByMemberIn(List<Member> members);
    List<RentHist> findBySpaceIn(List<Space> spaces);
    List<RentHist> findByApplyStatus(Status status);
    List<RentHist> findByPayStatus(Status status);
}
