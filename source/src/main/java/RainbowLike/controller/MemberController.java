package RainbowLike.controller;


import RainbowLike.constant.EduType;
import RainbowLike.constant.Gender;
import RainbowLike.constant.RecuMethod;
import RainbowLike.constant.Type;
import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;


    @GetMapping
    private Iterable<Member> getMembers() {
        return memberRepository.findAll();
    }

    @GetMapping("/id/{memId}")
    private Member getMembersByMemId(@PathVariable String memId) {
        return memberRepository.findByMemId(memId);
    }

    @GetMapping("/id-tel/{tel}")
    private String getMemIdByTel(@PathVariable String tel) {
        return memberRepository.findByTel(tel).getMemId();
    }

    @GetMapping("/tel-id/{id}")
    private String getTelByMemId(@PathVariable String id) {
        return memberRepository.findByMemId(id).getTel();
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<Member> searchMember(@PathVariable String option, @PathVariable String value) {
        Iterable<Member> result;
        switch (option) {
            case "memId":
                result = memberRepository.findByMemIdContaining(value);
                break;
            case "type":
                Type type = Type.valueOf(value);
                result = memberRepository.findByType(type);
                break;
            case "name":
                result = memberRepository.findByNameContaining(value);
                break;
            case "addr":
                result = memberRepository.findByAddrContaining(value);
                break;
            case "gender":
                Gender gender = Gender.valueOf(value);
                result = memberRepository.findByGender(gender);
                break;
            default:
                result = new ArrayList<>();
        }
        return result;
    }

    @GetMapping("/check/{type}/{value}")
    private boolean checkDuplicate(@PathVariable String type, @PathVariable String value) {
        switch (type) {
            case "memId":
                return memberRepository.findByMemId(value) != null;
            case "email":
                return memberRepository.findByEmail(value) != null;
            case "tel":
                return memberRepository.findByTel(value) != null;
            default:
                throw new IllegalArgumentException("Invalid type provided");
        }
    }

    @PostMapping
    private ResponseEntity<Member> saveMember(@RequestBody Member member) {

        System.out.println("암호화 전 " + member.getPwd());
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(member.getPwd());
        member.setPwd(encodedPassword);

        System.out.println("암호화 후 " + encodedPassword);
        // 데이터베이스에 저장
        return ResponseEntity.ok(memberRepository.save(member));
    }

    @PutMapping("/id/{id}/{pwd}")
    private ResponseEntity<?> memberPwdChange(@PathVariable String id,@PathVariable String pwd) {
        System.out.println("아이디" + id);
        System.out.println("비밀번호"+ pwd);
        Member member = memberRepository.findByMemId(id);
        member.setPwd(pwd);
        memberRepository.save(member);
        return ResponseEntity.ok(member);
    }

    //  유형별 사용자 생성
    @PostConstruct
    private void createDefaultMembers() {
        System.out.println("멤버 생성");
        // 관리자
        boolean check1 = memberService.checkIdDuplicate("admin");
        if (check1) // 이미 admin 계정이 있는 경우 관리자계정 생성하지않음
            return;
        MemberFormDto memberFormDto1 = MemberFormDto.createAdmin();
        Member member = Member.createMember(memberFormDto1, passwordEncoder);
        memberService.saveMember(member);

        // 유저
        boolean check2 = memberService.checkIdDuplicate("user");
        if (check2)
            return;
        MemberFormDto memberFormDto2 = MemberFormDto.createUser();
        member = Member.createMember(memberFormDto2, passwordEncoder);
        memberService.saveMember(member);

        // 노무사
        boolean check3 = memberService.checkIdDuplicate("labor");
        if (check3)
            return;
        MemberFormDto memberFormDto3 = MemberFormDto.createLabor();
        member = Member.createMember(memberFormDto3, passwordEncoder);
        memberService.saveMember(member);

        // 상담사
        boolean check4 = memberService.checkIdDuplicate("counselor");
        if (check4)
            return;
        MemberFormDto memberFormDto4 = MemberFormDto.createCounselor();
        member = Member.createMember(memberFormDto4, passwordEncoder);
        memberService.saveMember(member);

        // 테스트 더미
        List<MemberFormDto> memberFormDtoList = MemberFormDto.createtestMember();
        System.out.println("멤버 더미 확인");
        for (MemberFormDto memberFormDto: memberFormDtoList) {
            member = Member.createMember(memberFormDto, passwordEncoder);
            memberService.saveMember(member);
        }
    }


}
