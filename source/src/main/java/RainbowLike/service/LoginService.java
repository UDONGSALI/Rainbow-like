package RainbowLike.service;


import RainbowLike.config.AccountCredentials;
import RainbowLike.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import RainbowLike.repository.MemberRepository;


@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    public String generateToken(AccountCredentials credentials) {
        Member member = memberRepository.findByMemId(credentials.getUsername());
        return jwtService.getToken(member.getMemId(), member.getType().toString(), member.getMemNum());
    }
}
