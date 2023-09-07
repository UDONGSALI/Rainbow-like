package RainbowLike.dto;


import RainbowLike.constant.Type;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;



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
    private String gender;

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

    public MemberFormDto() {
    }

    static public MemberFormDto createtestman() {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setMemId("test");
        memberFormDto.setPwd("12341234");
        memberFormDto.setName("관리자");
        memberFormDto.setEmail("test@abc.com");
        memberFormDto.setType(Type.ADMIN);
        memberFormDto.setGender("W");
        memberFormDto.setTel("01012345678");
        memberFormDto.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto.setAddrDtl("양호빌딩 6층");
        memberFormDto.setAddrPost("35235");

        return memberFormDto;
    }
    static public MemberFormDto createAdmin() {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setMemId("admin");
        memberFormDto.setPwd("12341234");
        memberFormDto.setName("관리자");
        memberFormDto.setEmail("admin@abc.com");
        memberFormDto.setType(Type.ADMIN);
        memberFormDto.setGender("W");
        memberFormDto.setTel("01012345678");
        memberFormDto.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto.setAddrDtl("양호빌딩 6층");
        memberFormDto.setAddrPost("35235");

        return memberFormDto;
    }

    static public MemberFormDto createUser() {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setMemId("user");
        memberFormDto.setPwd("12341234");
        memberFormDto.setName("유저");
        memberFormDto.setEmail("user@abc.com");
        memberFormDto.setType(Type.USER);
        memberFormDto.setGender("W");
        memberFormDto.setTel("01012345678");
        memberFormDto.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto.setAddrDtl("양호빌딩 6층");
        memberFormDto.setAddrPost("35235");

        return memberFormDto;
    }

    static public MemberFormDto createLabor() {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setMemId("labor");
        memberFormDto.setPwd("12341234");
        memberFormDto.setName("노무사");
        memberFormDto.setEmail("labor@abc.com");
        memberFormDto.setType(Type.LABOR);
        memberFormDto.setGender("W");
        memberFormDto.setTel("01023456789");
        memberFormDto.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto.setAddrDtl("양호빌딩 6층");
        memberFormDto.setAddrPost("35235");

        return memberFormDto;
    }

    static public MemberFormDto createCounselor() {
        MemberFormDto memberFormDto = new MemberFormDto();
        memberFormDto.setMemId("counselor");
        memberFormDto.setPwd("12341234");
        memberFormDto.setName("상담사");
        memberFormDto.setEmail("counselor@abc.com");
        memberFormDto.setType(Type.COUNSELOR);
        memberFormDto.setGender("W");
        memberFormDto.setTel("01012345678");
        memberFormDto.setBir(LocalDate.of(2000, 10, 10));
        memberFormDto.setAddr("대전광역시 서구 둔산서로 17");
        memberFormDto.setAddrDtl("양호빌딩 6층");
        memberFormDto.setAddrPost("35235");

        return memberFormDto;
    }


}
