package RainbowLike.repository;

import RainbowLike.entity.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository <File,Long> {

    List<File> findByMember(Member member);

    List<File> findByEdu(Edu edu);

    List<File> findByPost(Post post);

    List<File> findByPostIsNotNull();

    List<File> findByEduIsNotNull();

    List<File> findByEduHistIsNotNull();

    List<File> findByMemberIsNotNull();

    Void deleteAllByEdu(Edu edu);

    Void deleteAllByMember(Member member);

    Void deleteAllBySpace(Space space);

    Void deleteAllByPost(Post post);


    @Modifying
    @Query("delete from File p where p.member.memId = :memId")
    void deleteByMember_MemId(@Param("memId") String memId);


    boolean existsByMember_MemId(String memId);
}
