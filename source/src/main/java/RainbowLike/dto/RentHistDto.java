package RainbowLike.dto;


import RainbowLike.constant.Status;
import RainbowLike.entity.Member;
import RainbowLike.entity.Space;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.SpaceRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

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
    @JsonIgnore
    private Member member;

    @NotNull
    @JsonIgnore
    private Space space;

    @NotNull
    private LocalDateTime rentStdt;

    @NotNull
    private LocalDateTime rentEddt;

    @NotNull
    private LocalDateTime applyDate;

    @NotBlank
    private Status applyStatus;


    private Status payStatus;


    static public ArrayList<RentHistDto> createRentHists() {
        ArrayList<RentHistDto> rentHistList = new ArrayList<RentHistDto>();

        RentHistDto rentHistDto1 = new RentHistDto();

        Member member1 = new Member();
        member1.setMemNum(1L);
        Space space1 = new Space();
        space1.setSpaceNum(7L);
        LocalDateTime rentStdt1 = LocalDateTime.of(2023, 9, 1, 18, 30, 0, 0);
        LocalDateTime rentEddt1 = LocalDateTime.of(2023, 9, 1, 20, 30, 0, 0);
        LocalDateTime applyDate1 = LocalDateTime.of(2023, 9, 1, 9, 30, 0, 0);

        rentHistDto1.setMember(member1);
        rentHistDto1.setSpace(space1);
        rentHistDto1.setRentStdt(rentStdt1);
        rentHistDto1.setRentEddt(rentEddt1);
        rentHistDto1.setApplyDate(applyDate1);
        rentHistDto1.setApplyStatus(Status.WAIT);
        rentHistDto1.setPayStatus(Status.WAIT);

        rentHistList.add(rentHistDto1);


        RentHistDto rentHistDto2 = new RentHistDto();

        Member member2 = new Member();
        member2.setMemNum(2L);
        Space space2 = new Space();
        space2.setSpaceNum(2L);
        LocalDateTime rentStdt2 = LocalDateTime.of(2023, 9, 1, 18, 30, 0, 0);
        LocalDateTime rentEddt2 = LocalDateTime.of(2023, 9, 1, 20, 30, 0, 0);
        LocalDateTime applyDate2 = LocalDateTime.of(2023, 9, 1, 9, 30, 0, 0);

        rentHistDto2.setMember(member2);
        rentHistDto2.setSpace(space2);
        rentHistDto2.setRentStdt(rentStdt2);
        rentHistDto2.setRentEddt(rentEddt2);
        rentHistDto2.setApplyDate(applyDate2);
        rentHistDto2.setApplyStatus(Status.APPROVE);
        rentHistDto2.setPayStatus(Status.COMPLETE);

        rentHistList.add(rentHistDto2);



        return rentHistList;

    }

}
