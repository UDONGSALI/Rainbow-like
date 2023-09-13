package RainbowLike.repository;

<<<<<<< HEAD

=======
>>>>>>> 16bb48503db92aaa317005e5dfa193c03ce83cb9
import RainbowLike.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {


<<<<<<< HEAD
=======
    Space findBySpaceName(String spaceName);

    Space findBySpaceNum(Long sapceNum);
>>>>>>> 16bb48503db92aaa317005e5dfa193c03ce83cb9

    Space findTopByOrderBySpaceNumDesc();


<<<<<<< HEAD


=======
>>>>>>> 16bb48503db92aaa317005e5dfa193c03ce83cb9
}
