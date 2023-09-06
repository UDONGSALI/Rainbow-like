package RainbowLike.repository;

import RainbowLike.entity.SmsRecepTel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsRecepTelRepository extends JpaRepository <SmsRecepTel, Long> {
}
