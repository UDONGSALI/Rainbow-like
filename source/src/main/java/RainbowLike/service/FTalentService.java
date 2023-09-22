package RainbowLike.service;

import RainbowLike.dto.FtcDto;
import RainbowLike.dto.FtmDto;
import RainbowLike.dto.FtwDto;
import RainbowLike.dto.PostFormDto;
import RainbowLike.entity.FemaleTalentMatching;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Post;
import RainbowLike.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

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
}
