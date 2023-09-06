package RainbowLike;

import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication {

    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }
}


