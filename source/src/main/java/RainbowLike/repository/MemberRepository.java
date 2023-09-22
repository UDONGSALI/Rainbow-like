package RainbowLike.repository;

import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMemId(String memId);
    Member findByEmail(String email);
    Member findByTel(String tel);

    Member findByName(String name);


    Member findByMemNum(Long memNum);

    Member findTopByOrderByMemNumDesc();


}
