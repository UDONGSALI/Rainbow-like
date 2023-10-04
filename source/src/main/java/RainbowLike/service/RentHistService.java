package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.constant.Type;
import RainbowLike.dto.RentHistDto;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.RentHistRepository;
import RainbowLike.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RentHistService {
    private final RentHistRepository rentHistRepository;
    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final ModelMapper modelMapper;

    public List<RentHist> getAllRentHists() {
        return rentHistRepository.findAll();

    }

    public Iterable<RentHist> searchRentHist(String option, String value, String memId) {
        Iterable<RentHist> result;
        switch (option) {
            case "spaceName":
                result = rentHistRepository.findBySpaceIn(spaceRepository.findBySpaceNameContaining(value));
                break;
            case "memId":
                result = rentHistRepository.findByMemberIn(memberRepository.findByMemIdContaining(value));
                break;
            case "applyStatus":
                Status applyStatus = Status.valueOf(value);
                result = rentHistRepository.findByApplyStatus(applyStatus);
                break;
            case "payStatus":
                Status payStatus = Status.valueOf(value);
                result = rentHistRepository.findByPayStatus(payStatus);
                break;
            default:
                result = new ArrayList<>();
        }
        if (!isAdmin(memId)) {
            List<RentHist> filteredList = new ArrayList<>();
            for (RentHist rentHist : result) {
                if (rentHist.getMember().getMemId().equals(memId)) {
                    filteredList.add(rentHist);
                }
            }
            result = filteredList;
        }
        return result;
    }

    private boolean isAdmin(String memId) {
        return memberRepository.findByMemId(memId).getType() == Type.ADMIN;
    }

    public void createRentHists(List<RentHistDto> rentHistDtoList) {

        for (RentHistDto rentHistDto : rentHistDtoList) {
            RentHist rentHist = modelMapper.map(rentHistDto, RentHist.class);
            rentHistRepository.save(rentHist);
        }
    }

    public Optional<RentHist> updateRentHistStatus(Long rentHistNum, Status status) {
        Optional<RentHist> optionalRentHist = rentHistRepository.findById(rentHistNum);
        if (optionalRentHist.isPresent()) {
            RentHist rentHist = optionalRentHist.get();
            rentHist.setApplyStatus(status);
            return Optional.of(rentHistRepository.save(rentHist));
        }
        return Optional.empty();
    }

    public void cancelRentHist(Long rentHistNum) {
        rentHistRepository.deleteById(rentHistNum);
    }

    public void createBasicRent() {
        ArrayList<RentHistDto> rentHistDtoList =RentHistDto.createRentHists();
        createRentHists(rentHistDtoList);
    }

}
