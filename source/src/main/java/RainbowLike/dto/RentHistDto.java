package RainbowLike.dto;


import RainbowLike.entity.Member;
import RainbowLike.entity.Space;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.SpaceRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter

public class RentHistDto {

    private static MemberRepository memberRepository;
    private static SpaceRepository spaceRepository;

    @NotNull
    private Member member;

    @NotNull
    private Space space;

    @NotNull
    private LocalDateTime rentStdt;

    @NotNull
    private LocalDateTime rentEddt;

    @NotNull
    private LocalDateTime applyDate;

    @NotBlank
    private String applyStatus;


    private String payStatus;



    public static RentHistDto createRentHist(Member member, Space space, LocalDateTime rentStdt, LocalDateTime rentEddt,
                                             LocalDateTime applyDate, String applyStatus, String payStatus) {
        RentHistDto rentHistDto = new RentHistDto();
        rentHistDto.setMember(member);
        rentHistDto.setSpace(space);
        rentHistDto.setRentStdt(rentStdt);
        rentHistDto.setRentEddt(rentEddt);
        rentHistDto.setApplyDate(applyDate);
        rentHistDto.setApplyStatus(applyStatus);
        rentHistDto.setPayStatus(payStatus);
        return rentHistDto;
    }

    static public ArrayList<RentHistDto> createRentHists(){
        ArrayList<RentHistDto> rentHistList =new ArrayList<RentHistDto>();
        Member member1=new Member();
        member1.setMemNum(1L);
        Space space1=new Space();
        space1.setSpaceNum(1L);
        LocalDateTime rentStdt=LocalDateTime.of(2023,9,1,18,30,0,0);
        LocalDateTime rentEddt=LocalDateTime.of(2023,9,1,20,30,0,0);
        LocalDateTime applyDate=LocalDateTime.of(2023,9,1,9,30,0,0);

        RentHistDto rent1=RentHistDto.createRentHist(member1, space1, rentStdt,rentEddt,applyDate,"예약완료","결제완료");

        rentHistList.add(rent1);

        return rentHistList;

    }



}
