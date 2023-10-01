package RainbowLike.controller;


import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

    private final MemberService memberService;
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

}
