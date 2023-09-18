package RainbowLike.repository;

import RainbowLike.entity.Edu;
import RainbowLike.entity.File;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository <File,Long> {

    List<File> findByMember(Member member);

    List<File> findByEdu(Edu edu);
}
