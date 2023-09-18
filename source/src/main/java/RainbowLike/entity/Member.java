package RainbowLike.entity;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.dto.MemberFormDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memNum;

    @Column(unique = true, length = 50, nullable = false)
    private String memId;

    @Column(nullable = false,length = 100)
    private String pwd;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate bir;

    @Column(nullable = false, length = 30)
    private String tel;

    @Column(unique = true, nullable = false,length = 100)
    private String email;

    @Column(nullable = false)
    private String addr;

    private String addrDtl;

    private String addrPost;

    @Column(nullable = false)
    private LocalDate jdate;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<File> files = new ArrayList<>();


    public static Member createMember(MemberFormDto memberFormDto, PasswordEncoder passwordEncoder){
        Member member = new Member();
        member.setMemId(memberFormDto.getMemId());
        String password = passwordEncoder.encode(memberFormDto.getPwd());
        member.setPwd(password);
        member.setName(memberFormDto.getName());
        member.setEmail(memberFormDto.getEmail());
        member.setGender(memberFormDto.getGender());
        member.setTel(memberFormDto.getTel());
        member.setBir(memberFormDto.getBir());
        member.setAddr(memberFormDto.getAddr());
        member.setAddrDtl(memberFormDto.getAddrDtl());
        member.setAddrPost(memberFormDto.getAddrPost());
        member.setJdate(LocalDate.now());
        member.setType(memberFormDto.getType());
        return member;
    }



    public Member(String memId, String pwd, Type type, String name, Gender gender, LocalDate bir, String tel, String email, String addr, String addrDtl, LocalDate jdate) {
        super();
        this.memId = memId;
        this.pwd = pwd;
        this.type = type;
        this.name = name;
        this.gender = gender;
        this.bir = bir;
        this.email = email;
        this.tel = tel ;
        this.addr = addr;
        this.addrDtl =addrDtl;
        this.jdate = jdate;
    }


}
