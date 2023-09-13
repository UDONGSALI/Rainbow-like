package RainbowLike.repository;

import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository <Member,Long> {

    Member findByMemId(String memId);

    Member findByName(String name);

<<<<<<< HEAD
=======
    Member findByMemNum(Long memNum);
    Member findTopByOrderByMemNumDesc();


>>>>>>> 3db001eb08878d49e7a560a9a7c6a636782027da
}
