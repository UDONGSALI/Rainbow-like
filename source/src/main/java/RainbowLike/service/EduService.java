package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduHistRepository;
import RainbowLike.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EduService {

    private final EduRepository eduRepository;

    private final EduHistRepository eduHistRepository;

    public void updateRecuPerson(Long eduNum) {
        Long count = eduHistRepository.countByEduAndStatus(eduNum, Status.APPROVE, Status.COMPLETE);
        Edu edu = eduRepository.findByEduNum(eduNum);
        edu.setRecuPerson(count.intValue());
        eduRepository.save(edu);
    }
}