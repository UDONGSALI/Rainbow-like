package RainbowLike.service;

import RainbowLike.dto.FtcDto;
import RainbowLike.dto.FtmDto;
import RainbowLike.dto.FtwDto;
import RainbowLike.entity.FemaleTalentMatching;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.repository.FemaleTalentMatchingRepository;
import RainbowLike.repository.FtConsumerRepository;
import RainbowLike.repository.FtWorkerRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FTalentService {
    @Autowired
    FtWorkerRepository ftwRepository;
    @Autowired
    FtConsumerRepository ftcRepository;
    @Autowired
    FemaleTalentMatchingRepository ftmRepository;

    private final ModelMapper mapper;

    public void createFtw(ArrayList<FtwDto> ftwList){
        for(FtwDto ftwDto : ftwList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            FtWorker ftw = mapper.map(ftwDto, FtWorker.class);

            ftwRepository.save(ftw);
        }
    }

    public void createFtc(ArrayList<FtcDto> ftcList){
        for(FtcDto ftcDto : ftcList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            FtConsumer ftc = mapper.map(ftcDto, FtConsumer.class);

            ftcRepository.save(ftc);
        }
    }

    public void createFtm(ArrayList<FtmDto> ftmList){
        for(FtmDto ftmDto : ftmList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            FemaleTalentMatching ftm = mapper.map(ftmDto, FemaleTalentMatching.class);

            ftmRepository.save(ftm);
        }
    }

    public List<String> findWTelByConsumerNum(Long ftcNum) {
        return ftmRepository.findWorkerTelByConsumerNum(ftcNum);
    }

    public List<String> findCTelByConsumerNum(Long ftcNum) {
        return ftmRepository.findConsumerTelByConsumerNum(ftcNum);
    }


    public void ftcSms (String to, Long ftcNum) {
        System.out.println("메시지를 받을 컨슈머 : " + to);
        System.out.println("[세종여성플라자] 신청하신 여성인재풀DB이 매칭되었습니다. \n신청하신 글을 확인해주세요.(로그인 후 확인 가능)  \n" + "http://localhost:3000/ftc/" + ftcNum);
    }
    public void ftwSms (String to) {
        System.out.println("메시지를 받을 워커 : " + to);
        System.out.println("[세종여성플라자] 회원님의 여성인재풀DB가 열람되었습니다. \n여성인재풀DB에 기재하신 연락처로 연락이 갈 수 있습니다.");
    }


}
