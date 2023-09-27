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
        LocalDateTime rentStdt1=LocalDateTime.of(2023,9,1,18,30,0,0);
        LocalDateTime rentEddt1=LocalDateTime.of(2023,9,1,20,30,0,0);
        LocalDateTime applyDate1=LocalDateTime.of(2023,9,1,9,30,0,0);

        RentHistDto rent1=RentHistDto.createRentHist(member1, space1, rentStdt1,rentEddt1,applyDate1,"예약완료","결제완료");

        rentHistList.add(rent1);


        Member member2=new Member();
        member2.setMemNum(2L);
        Space space2=new Space();
        space2.setSpaceNum(2L);
        LocalDateTime rentStdt2=LocalDateTime.of(2023,9,1,18,30,0,0);
        LocalDateTime rentEddt2=LocalDateTime.of(2023,9,1,20,30,0,0);
        LocalDateTime applyDate2=LocalDateTime.of(2023,9,1,9,30,0,0);

        RentHistDto rent2=RentHistDto.createRentHist(member2, space2, rentStdt2,rentEddt2,applyDate2,"예약완료","결제대기");

        rentHistList.add(rent2);

        return rentHistList;

    }

}
