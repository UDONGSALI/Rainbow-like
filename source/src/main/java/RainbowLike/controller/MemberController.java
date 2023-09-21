package RainbowLike.controller;


import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.Console;

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

    @GetMapping("/check/{type}/{value}")
    private boolean checkDuplicate(@PathVariable String type, @PathVariable String value) {
        switch(type) {
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
    public ResponseEntity<Member> saveMember(@RequestBody Member member) {

        System.out.println("암호화 전 " + member.getPwd());
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(member.getPwd());
        member.setPwd(encodedPassword);

        System.out.println("암호화 후 " +  encodedPassword);
        // 데이터베이스에 저장
        return ResponseEntity.ok(memberRepository.save(member));
    }


    //  유형별 사용자 생성
    @PostConstruct
    private void createDefaultMembers() {
        // 관리자
        boolean check1 = memberService.checkIdDuplicate("admin");
        if (check1) // 이미 admin 계정이 있는 경우 관리자계정 생성하지않음
            return;
        MemberFormDto memberFormDto = MemberFormDto.createAdmin();
        Member member = Member.createMember(memberFormDto, passwordEncoder);
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
    }

}
