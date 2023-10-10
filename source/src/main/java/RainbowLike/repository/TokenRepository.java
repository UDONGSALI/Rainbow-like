package RainbowLike.repository;

import RainbowLike.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    void deleteByJti(String jti);
    void deleteAllByExpirationDateBefore(Date date);

}
