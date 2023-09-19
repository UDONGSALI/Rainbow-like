package RainbowLike.service;

import RainbowLike.dto.RentHistDto;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.RentHistRepository;
import RainbowLike.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RentHistService {
    private final RentHistRepository rentHistRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public RentHistService(RentHistRepository rentHistRepository, ModelMapper modelMapper, MemberRepository memberRepository, SpaceRepository spaceRepository){
        this.rentHistRepository = rentHistRepository;
        this.modelMapper = modelMapper;
    }

    public List<RentHist> getAllRentHists(){
       return rentHistRepository.findAll();

    }

    public void createRentHists(List<RentHistDto> rentHistDtoList) {

        for (RentHistDto rentHistDto : rentHistDtoList) {
            RentHist rentHist = modelMapper.map(rentHistDto, RentHist.class);
            rentHistRepository.save(rentHist);
        }
    }

    public void cancelRentHist(Long rentHistNum){
        rentHistRepository.deleteById(rentHistNum);
    }
}
