package RainbowLike.service;

import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Member;
import RainbowLike.repository.FtConsumerRepository;
import RainbowLike.repository.FtWorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FTByMemberService {
    @Autowired
    private FtWorkerRepository ftWorkerRepository;

    @Autowired
    private FtConsumerRepository ftConsumerRepository;

    public List<FtWorker> getFtWorkerInfoByMember(Member member) {
        return ftWorkerRepository.findByMember(member);
    }

    public List<FtConsumer> getFtConsumerInfoByMember(Member member) {
        return ftConsumerRepository.findByMember(member);
    }
}
