package RainbowLike.controller;


import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;


    @RequestMapping("/members")
    private Iterable<Member> getMembers() {
        return memberRepository.findAll();
    }

    @PostMapping("/members")
    private void PostMember(Member member) {
        memberService.saveMember(member);
    }


    //  유형별 사용자 생성
    @PostConstruct
    private void createCommonMembers() {
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
