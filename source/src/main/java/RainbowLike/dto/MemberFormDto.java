package RainbowLike.dto;


import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class MemberFormDto {

    private Type type;

    private String memId;

    @NotEmpty(message = "아이디 중복체크를 해주세요.")
    private String checked;

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String pwd;

    @NotEmpty(message = "비밀번호확인은 필수입니다.")
    private String confirmPwd;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;

    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    @NotBlank(message = "성별을 선택해주세요.")
    private Gender gender;

    @Length(min = 10, max = 11, message = "전화번호를 형식에 맞게 입력해주세요")
    private String tel;

    @Length(min = 8, max = 8, message = "생년월일을 형식에 맞게 입력해주세요")
    private LocalDate bir;

    @NotBlank(message = "주소는 필수 입력 값입니다.")
    private String addr;

    @NotBlank(message = "상세 주소는 필수 입력 값입니다.")
    private String addrDtl;

    @NotBlank(message = "우편번호는 필수 입력 값입니다.")
    private String addrPost;

    @NotBlank
    private LocalDate jdate;

    static public  List<MemberFormDto> createtestMember() {
        List<MemberFormDto> memberFormDtoList = new ArrayList<>();

        MemberFormDto memberFormDto1 = new MemberFormDto();
        memberFormDto1.setMemId("admin");
        memberFormDto1.setPwd("12341234");
        memberFormDto1.setName("관리자");
        memberFormDto1.setEmail("admin@abc.com");
        memberFormDto1.setType(Type.ADMIN);
        memberFormDto1.setGender(Gender.FEMALE);
        memberFormDto1.setTel("01012345678");
        memberFormDto1.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto1.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto1.setAddrDtl("양호빌딩 6층");
        memberFormDto1.setAddrPost("35235");
        memberFormDto1.setJdate(LocalDate.now());
        memberFormDtoList.add(memberFormDto1);

        MemberFormDto memberFormDto2 = new MemberFormDto();
        memberFormDto2.setMemId("user");
        memberFormDto2.setPwd("12341234");
        memberFormDto2.setName("유저");
        memberFormDto2.setEmail("user@abc.com");
        memberFormDto2.setType(Type.USER);
        memberFormDto2.setGender(Gender.FEMALE);
        memberFormDto2.setTel("01012345678");
        memberFormDto2.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto2.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto2.setAddrDtl("양호빌딩 6층");
        memberFormDto2.setAddrPost("35235");
        memberFormDto2.setJdate(LocalDate.now());
        memberFormDtoList.add(memberFormDto2);

        MemberFormDto memberFormDto3 = new MemberFormDto();
        memberFormDto3.setMemId("labor");
        memberFormDto3.setPwd("12341234");
        memberFormDto3.setName("노무사");
        memberFormDto3.setEmail("labor@abc.com");
        memberFormDto3.setType(Type.LABOR);
        memberFormDto3.setGender(Gender.FEMALE);
        memberFormDto3.setTel("01023456789");
        memberFormDto3.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto3.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto3.setAddrDtl("양호빌딩 6층");
        memberFormDto3.setAddrPost("35235");
        memberFormDto3.setJdate(LocalDate.now());
        memberFormDtoList.add(memberFormDto3);

        MemberFormDto memberFormDto4 = new MemberFormDto();
        memberFormDto4.setMemId("counselor");
        memberFormDto4.setPwd("12341234");
        memberFormDto4.setName("상담사");
        memberFormDto4.setEmail("counselor@abc.com");
        memberFormDto4.setType(Type.COUNSELOR);
        memberFormDto4.setGender(Gender.FEMALE);
        memberFormDto4.setTel("01012345678");
        memberFormDto4.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto4.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto4.setAddrDtl("양호빌딩 6층");
        memberFormDto4.setAddrPost("35235");
        memberFormDto4.setJdate(LocalDate.now());
        memberFormDtoList.add(memberFormDto4);

        for (int i = 0; i < 100; i++) {
            MemberFormDto memberFormDto = new MemberFormDto();
            memberFormDto.setMemId("user" + i);
            memberFormDto.setPwd("12341234");
            memberFormDto.setName("테스트" + i);
            memberFormDto.setEmail("test@abc.com" + i);
            memberFormDto.setType(Type.USER);
            memberFormDto.setGender(Gender.FEMALE);
            memberFormDto.setTel("0101234567" + i);
            memberFormDto.setBir(LocalDate.of(2000, 10, 10));
            memberFormDto.setAddr("대전광역시 서구 둔산서로 17");
            memberFormDto.setAddrDtl("양호빌딩 6층");
            memberFormDto.setAddrPost("35235");
            memberFormDto.setJdate(LocalDate.now());

            memberFormDtoList.add(memberFormDto);
        }
        return memberFormDtoList;
    }


}
