package RainbowLike.repository;

import RainbowLike.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileRepository extends JpaRepository <File,Long> {

    List<File> findByMember(Member member);
    List<File> findBySpace(Space space);
    List<File> findByEdu(Edu edu);
    List<File> findByPost(Post post);


}
