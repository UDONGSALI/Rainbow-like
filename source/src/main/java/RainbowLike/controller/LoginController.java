package RainbowLike.controller;


import RainbowLike.config.AccountCredentials;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    private final MemberRepository memberRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {

        // 입력된 내용 중 아이디로 멤버를 찾아옴
        Member member = memberRepository.findByMemId(credentials.getUsername());

        // 토큰에 아이디와 유형을 넣어서 생산
        String jwts = jwtService.getToken(member.getMemId(), member.getType().toString(), member.getMemNum());

        // 생성된 토큰을 HTTP 응답 헤더에 추가하여 클라이언트에게 반환
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();
    }


}
