package RainbowLike.repository;

import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EduRepository extends JpaRepository<Edu,Long>{

    Edu findByEduNum(Long eduNum);

    Edu findTopByOrderByEduNumDesc();

}
