package RainbowLike.controller;


import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    @GetMapping
    public ResponseEntity<Iterable<Member>> getMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    @GetMapping("/id/{memId}")
    public ResponseEntity<Member> getMembersByMemId(@PathVariable String memId) {
        return memberService.findMemberByMemId(memId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/id-tel/{tel}")
    public ResponseEntity<String> getMemIdByTel(@PathVariable String tel) {
        return memberService.findMemIdByTel(tel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/tel-id/{id}")
    public ResponseEntity<String> getTelByMemId(@PathVariable String id) {
        return memberService.findTelByMemId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search/{option}/{value}")
    public ResponseEntity<Iterable<Member>> searchMember(@PathVariable String option, @PathVariable String value) {
        return ResponseEntity.ok(memberService.searchMember(option, value));
    }

    @GetMapping("/check/{type}/{value}")
    public ResponseEntity<Boolean> checkDuplicate(@PathVariable String type, @PathVariable String value) {
        return ResponseEntity.ok(memberService.checkDuplicate(type, value));
    }

    @PostMapping
    public ResponseEntity<Member> saveMember(@RequestBody MemberFormDto memberDto) {
        Member savedMember = memberService.saveMember(memberDto);
        return ResponseEntity.ok(savedMember);
    }

    @PatchMapping("/id/{id}/{pwd}")
    public ResponseEntity<?> memberPwdChange(@PathVariable String id, @PathVariable String pwd) {
        Member updatedMember = memberService.changePassword(id, pwd);
        if (updatedMember != null) {
            return ResponseEntity.ok(updatedMember);
        }
        return ResponseEntity.badRequest().body("Failed to update password");
    }

    @GetMapping("/{memId}")
    public ResponseEntity<Member> getMemberInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;

            String username = userDetails.getUsername();  // 여기서 사용자의 아이디를 가져옴
            Member member = memberRepository.findByMemId(username);

            if (member != null) {
                // 멤버 정보를 반환
                return ResponseEntity.ok(member);
            } else {
                return ResponseEntity.status(401).build();
            }
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @RequestMapping("/memInfo/{memNum}")
    public Member getMemberByMemNum(@PathVariable Long memNum){
        return memberRepository.findByMemNum(memNum);
    }

}
