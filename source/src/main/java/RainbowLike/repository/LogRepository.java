package RainbowLike.repository;

import RainbowLike.constant.EduType;
import RainbowLike.constant.EventType;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.Log;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository  extends JpaRepository<Log,Long> {
    Iterable<Log> findByType(EventType type);

    Iterable<Log> findByUrlContaining(String url);

    Iterable<Log> findByMemberIn(List<Member> members);

    @Modifying
    @Query("delete from Log p where p.member.memId = :memId")
    void deleteByMember_MemId(@Param("memId") String memId);

    boolean existsByMember_MemId(String memId);

    void deleteByMember_MemIdAndMember_MemNum(String memId, Long memNum);

}
